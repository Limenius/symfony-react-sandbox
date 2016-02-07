<?php

namespace AppBundle\Twig;
use Nacmartin\PhpExecJs\PhpExecJs;
use AppBundle\Exception\EvalJsError;

class ReactRenderExtension extends \Twig_Extension
{
    public function getFunctions()
    {
        return array(
            new \Twig_SimpleFunction('react_component', array($this, 'reactServerSideRender'), array('is_safe' => array('html'))));
    }

    public function reactServerSideRender($componentName, $options = array())
    {
        $phpexecjs = new PhpExecJs();
        $serverBundle = file_get_contents(dirname(__FILE__).'/../../../server-bundle.js');
        $phpexecjs->createContext($this->consolePolyfill()."\n".$serverBundle);
        $propsString = isset($options['props']) ? $options['props'] : '';
        //TODO: needs error checking
        $result = json_decode($phpexecjs->evalJs($this->wrap($componentName, $propsString)), true);
        $str = '<div class="js-react-on-rails-component" style="display:none" data-component-name="RecipesApp" data-props="'.htmlspecialchars($propsString).'" data-trace="false" data-expect-turbolinks="true" data-dom-id="HOLA-AMIGOS"></div>';
        $str .='<div id="HOLA-AMIGOS">'.$result['html'].$result['consoleReplayScript'].'</div>';
        return $str;
    }

    public function consolePolyfill()
    {
        $console = <<<JS
var console = { history: [] };
['error', 'log', 'info', 'warn'].forEach(function (level) {
  console[level] = function () {
    var argArray = Array.prototype.slice.call(arguments);
    if (argArray.length > 0) {
      argArray[0] = '[SERVER] ' + argArray[0];
    }
    console.history.push({level: level, arguments: argArray});
  };
});
JS;
        return $console;
    }

    public function wrap($name, $propsString)
    {
        $wrapperJs = <<<JS
(function() {
  var props = $propsString;
  return ReactOnRails.serverRenderReactComponent({
    name: '$name',
    domNodeId: 'HOLA-AMIGOS',
    props: props,
    trace: false,
    location: ''
  });
})()
JS;
        return $wrapperJs;
    }

    public function getName()
    {
        return 'react_render_extension';
    }
}
