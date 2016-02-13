<?php

namespace Limenius\ReactBundle\Twig;

use Nacmartin\PhpExecJs\PhpExecJs;
use AppBundle\Exception\EvalJsError;
use Limenius\ReactBundle\Renderer\ReactRenderer;

class ReactRenderExtension extends \Twig_Extension
{
    private $renderer;
    protected $renderServerSide = false;
    protected $renderClientSide = false;

    /**
     * Constructor
     * 
     * @param ReactRenderer $renderer 
     * @param string $defaultRendering 
     * @access public
     * @return void
     */
    public function __construct(ReactRenderer $renderer, $defaultRendering)
    {
        $this->renderer = $renderer;

        switch ($defaultRendering) {
        case 'only_serverside':
            $this->renderClientSide = false;
            $this->renderServerSide = true;
            break;
        case 'only_clientside':
            $this->renderClientSide = true;
            $this->renderServerSide = false;
            break;
        case 'both':
            $this->renderClientSide = true;
            $this->renderServerSide = true;
            break;
        }
    }

    public function getFunctions()
    {
        return array(
            new \Twig_SimpleFunction('react_component', array($this, 'reactRenderComponent'), array('is_safe' => array('html'))));
    }

    public function reactRenderComponent($componentName, $options = array())
    {
        $uuid = 'sfreact-'.uniqid();
        $propsString = isset($options['props']) ? $options['props'] : '';
        $str = '';
        if ($this->renderClientSide) {
            $str .= '<div class="js-react-on-rails-component" style="display:none" data-component-name="'.$componentName.'" data-props="'.htmlspecialchars($propsString).'" data-trace="true" data-dom-id="'.$uuid.'"></div>';
        }
        $str .= '<div id="'.$uuid.'">';
        if ($this->renderServerSide) {

            $serverSideStr = $this->renderer->render($componentName, $propsString, $uuid);
            $str .= $serverSideStr;
        }
        $str .= '</div';
        return $str;
    }


    public function getName()
    {
        return 'react_render_extension';
    }
}
