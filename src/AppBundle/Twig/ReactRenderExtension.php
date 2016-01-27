<?php

namespace AppBundle\Twig;
use Nacmartin\PhpExecJs\PhpExecJs;

class ReactRenderExtension extends \Twig_Extension
{
    public function getFunctions()
    {
        return array(
            new \Twig_SimpleFunction('reactServerSide', array($this, 'reactServerSideRender'), array('is_safe' => array('html'))));
    }

    public function reactServerSideRender($options)
    {
        $phpexecjs = new PhpExecJs();
        $phpexecjs->createContextFromFile(dirname(__FILE__).'/../../../server-bundle.js');
        return json_decode($phpexecjs->evalJs("console.log(ReactOnRails.serverRenderReactComponent({name: '".$options['name']."'}))"))->html;
    }

    public function getName()
    {
        return 'react_render_extension';
    }
}
