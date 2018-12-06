<?php

namespace App\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Serializer\SerializerInterface;

use App\Entity\Recipe;

class RecipeController extends Controller
{
    /**
     * @Route("/", name="homepage")
     */
    public function homeAction(SerializerInterface $serializer)
    {
        $recipes = $this->getDoctrine()
            ->getRepository(Recipe::class)
            ->findAll();

        return $this->render('recipe/home.html.twig', [
            // We pass an array as props
            'props' => $serializer->normalize(['recipes' => $recipes]),
        ]);
    }

    /**
     * @Route("/recipe/{id}", name="recipe")
     */
    public function recipeAction($id, Request $request)
    {
        $serializer = $this->get('serializer');
        $recipe = $this->getDoctrine()
            ->getRepository(Recipe::class)
            ->find($id);
        if (!$recipe) {
            throw $this->createNotFoundException('The recipe does not exist');
        }

        return $this->render('recipe/recipe.html.twig', [
            // A JSON string also works
            'props' => $serializer->serialize(
                ['recipe' => $recipe ], 'json')
        ]);
    }

    /**
     * @Route("/redux/", name="homepage_redux")
     */
    public function homeReduxAction(Request $request)
    {
        $recipes = $this->getDoctrine()
            ->getRepository(Recipe::class)
            ->findAll();
        $serializer = $this->get('serializer');

        return $this->render('recipe-redux/home.html.twig', [
            // We pass an array as props
            'initialState' => $serializer->normalize(
                ['recipes' => $recipes])
        ]);
    }

    /**
     * @Route("/redux/recipe/{id}", name="recipe_redux")
     */
    public function recipeReduxAction($id, Request $request)
    {
        $recipe = $this->getDoctrine()
            ->getRepository(Recipe::class)
            ->find($id);
        $serializer = $this->get('serializer');
        if (!$recipe) {
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
