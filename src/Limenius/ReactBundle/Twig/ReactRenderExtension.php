<?php

namespace Limenius\ReactBundle\Twig;

use Nacmartin\PhpExecJs\PhpExecJs;
use AppBundle\Exception\EvalJsError;
use Limenius\ReactBundle\Renderer\ReactRenderer;

class ReactRenderExtension extends \Twig_Extension
{
    private $renderer;

    /**
     * Constructor
     * 
     * @param ReactRenderer $renderer 
     * @access public
     * @return void
     */
    public function __construct(ReactRenderer $renderer)
    {
        $this->renderer = $renderer;
    }

    public function getFunctions()
    {
        return array(
            new \Twig_SimpleFunction('react_component', array($this, 'reactServerSideRender'), array('is_safe' => array('html'))));
    }

    public function reactServerSideRender($componentName, $options = array())
    {
        $uuid = 'sfreact-'.uniqid();
        $propsString = isset($options['props']) ? $options['props'] : '';
        $str = '<div class="js-react-on-rails-component" style="display:none" data-component-name="'.$componentName.'" data-props="'.htmlspecialchars($propsString).'" data-trace="true" data-dom-id="'.$uuid.'"></div>';
        $str .= '<div id="'.$uuid.'">';

        $serverSideStr = $this->renderer->render($componentName, $propsString, $uuid);
        $str .= $serverSideStr;
        $str .= '</div';
        return $str;
    }


    public function getName()
    {
        return 'react_render_extension';
    }
}
