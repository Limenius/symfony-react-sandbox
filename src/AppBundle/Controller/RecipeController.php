<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;

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
        if (!$recipe = $this->get('recipe.manager')->findOneBySlug($slug)) {
            throw $this->createNotFoundException('The recipe does not exist');
        }
        return $this->render('recipe/recipe.html.twig', [
            'props' => $serializer->serialize(
                ['recipe' => $this->get('recipe.manager')->findOneBySlug($slug),
                 'location' => $request->getRequestUri()
                ], 'json')
        ]);
    }

    /**
     * @Route("/api/recipes", name="api_recipes")
     *
     * Needed for client-side navigation after initial page load
     */
    public function apiRecipesAction(Request $request)
    {
        $serializer = $this->get('serializer');
        return new JsonResponse($this->get('recipe.manager')->findAll()->recipes);
    }

    /**
     * @Route("/api/recipes/{slug}", name="api_recipe")
     *
     * Needed for client-side navigation after initial page load
     */
    public function apiRecipeAction($slug, Request $request)
    {
        $serializer = $this->get('serializer');
        return new JsonResponse($this->get('recipe.manager')->findOneBySlug($slug));
    }
}
