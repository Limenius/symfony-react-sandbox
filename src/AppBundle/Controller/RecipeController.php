<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

use AppBundle\Entity\Recipe;
use AppBundle\Form\Type\RecipeType;

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

    /**
     * @Route("/api/recipes", name="api_recipes")
     *
     * Needed for client-side navigation after initial page load
     */
    public function apiRecipesAction(Request $request)
    {
        $serializer = $this->get('serializer');
        return new JsonResponse($serializer->normalize($this->get('recipes.repository.recipe')->findAll()));
    }

    /**
     * @Route("/api/recipes/{id}", name="api_recipe")
     *
     * Needed for client-side navigation after initial page load
     */
    public function apiRecipeAction($id, Request $request)
    {
        $serializer = $this->get('serializer');
        return new JsonResponse($serializer->normalize($this->get('recipes.repository.recipe')->find($id)));
    }

    /**
     * @Route("/liform/", name="liform")
     */
    public function liformAction(Request $request)
    {
        $recipe = new Recipe();
        $serializer = $this->get('serializer');
        $form = $this->createForm(RecipeType::Class, $recipe,
            array('csrf_protection' => false)
        );
        return $this->render('liform/index.html.twig', [
            'props' => [
                'recipes' => $serializer->normalize($this->get('recipes.repository.recipe')->findAll()),
                'schema' => $this->get('liform')->transform($form),
                'initialValues' => $serializer->normalize($form->createView()),
            ]
            ]);
    }

    /**
     * @Route("/liform/recipes", methods={"POST"}, name="liform_post")
     */
    public function liformPostAction(Request $request)
    {
        $serializer = $this->get('serializer');

        $recipe = new Recipe();
        $data = json_decode($request->getContent(), true);
        $form = $this->createForm(RecipeType::Class, $recipe,
            array('csrf_protection' => false)
        );
        $form->submit($data);
        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($recipe);
            $em->flush();

            $response = new Response($serializer->serialize($recipe, 'json'), 201);
            $response->headers->set('Location', 'We should provide a url here, but this is a dummy example and there is no location where you can retrieve a single recipe, so...');
            $response->headers->set('Content-Type', 'application/json');
            return $response;
        }
        return new JsonResponse($serializer->normalize($form), 400);
    }

}
