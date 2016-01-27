<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Nacmartin\PhpExecJs\PhpExecJs;

class DefaultController extends Controller
{
    /**
     * @Route("/", name="homepage")
     */
    public function indexAction(Request $request)
    {
        $phpexecjs = new PhpExecJs();
        $phpexecjs->createContextFromFile($this->container->getParameter('kernel.root_dir').'/../server-bundle.js');
        print_r($phpexecjs->evalJs("console.log(JSON.stringify(ReactOnRails.serverRenderReactComponent({name: 'HelloWorld'})))"));
        // replace this example code with whatever you need
        return $this->render('default/index.html.twig', [
            'base_dir' => realpath($this->getParameter('kernel.root_dir').'/..'),
        ]);
    }
}
