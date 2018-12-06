<?php

namespace App\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use App\Entity\Recipe;

class ApiController extends Controller
{
    /**
     * @Route("/api/recipes", name="api_recipes")
     *
     * Needed for client-side navigation after initial page load
     */
    public function apiRecipesAction(Request $request)
    {
        $serializer = $this->get('serializer');

        $recipes = $this->getDoctrine()
            ->getRepository(Recipe::class)
            ->findAll();

        return new JsonResponse($serializer->normalize($recipes));
    }

    /**
     * @Route("/api/recipes/{id}", name="api_recipe")
     *
     * Needed for client-side navigation after initial page load
     */
    public function apiRecipeAction($id, Request $request)
    {
        $recipe = $this->getDoctrine()
            ->getRepository(Recipe::class)
            ->find($id);
        $serializer = $this->get('serializer');

        return new JsonResponse($serializer->normalize($recipe));
    }

}
