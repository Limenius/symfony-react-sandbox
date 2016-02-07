<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Nacmartin\PhpExecJs\PhpExecJs;

class RecipeController extends Controller
{
    /**
     * @Route("/", name="homepage")
     */
    public function homeAction(Request $request)
    {
        $serializer = $this->get('serializer');
        return $this->render('recipe/home.html.twig', [
            'props' => $serializer->serialize(
                ['recipes' => $this->get('recipe.manager')->findAll()->recipes,
                 'location' => $request->getRequestUri()
                ], 'json')
        ]);
    }

    /**
     * @Route("/recipe/{slug}", name="recipe")
     */
    public function recipeAction($slug, Request $request)
    {
        $serializer = $this->get('serializer');
        return $this->render('recipe/recipe.html.twig', [
            'props' => $serializer->serialize(
                ['recipe' => $this->get('recipe.manager')->findOneBySlug($slug),
                 'location' => $request->getRequestUri()
                ], 'json')
        ]);
    }
}
