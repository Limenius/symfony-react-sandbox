<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class RecipeController extends Controller
{
    /**
     * @Route("/", name="homepage")
     */
    public function homeAction(Request $request)
    {
        $serializer = $this->get('serializer');
        return $this->render('recipe/home.html.twig', [
            // We pass an array as props
            'props' => $serializer->normalize(
                ['recipes' => $this->get('recipes.repository.recipe')->findAll(),
                ])
        ]);
    }

    /**
     * @Route("/recipe/{id}", name="recipe")
     */
    public function recipeAction($id, Request $request)
    {
        $serializer = $this->get('serializer');
        if (!$recipe = $this->get('recipes.repository.recipe')->find($id)) {
            throw $this->createNotFoundException('The recipe does not exist');
        }
        return $this->render('recipe/recipe.html.twig', [
            // A JSON string also works
            'props' => $serializer->serialize(
                ['recipe' => $recipe,
                ], 'json')
        ]);
    }

    /**
     * @Route("/redux/", name="homepage_redux")
     */
    public function homeReduxAction(Request $request)
    {
        $serializer = $this->get('serializer');
        return $this->render('recipe-redux/home.html.twig', [
            // We pass an array as props
            'initialState' => $serializer->normalize(
                ['recipes' => $this->get('recipes.repository.recipe')->findAll(),
                ])
        ]);
    }

    /**
     * @Route("/redux/recipe/{id}", name="recipe_redux")
     */
    public function recipeReduxAction($id, Request $request)
    {
        $serializer = $this->get('serializer');
        if (!$recipe = $this->get('recipes.repository.recipe')->find($id)) {
            throw $this->createNotFoundException('The recipe does not exist');
        }
        return $this->render('recipe-redux/recipe.html.twig', [
            // A JSON string also works
            'initialState' => $serializer->serialize(
                ['recipe' => $recipe,
                ], 'json')
        ]);
    }

}
