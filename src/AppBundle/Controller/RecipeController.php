<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

use AppBundle\Entity\Task;
use AppBundle\Form\Type\TaskType;

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
                // '/' or maybe '/app_dev.php/', so the React Router knows about the root
                 'baseUrl' => $this->generateUrl('homepage'),
                 'location' => $request->getRequestUri()
                ])
        ]);
    }

    /**
     * @Route("/recipe/{slug}", name="recipe")
     */
    public function recipeAction($slug, Request $request)
    {
        $serializer = $this->get('serializer');
        if (!$recipe = $this->get('recipes.repository.recipe')->findOneBySlug($slug)) {
            throw $this->createNotFoundException('The recipe does not exist');
        }
        return $this->render('recipe/recipe.html.twig', [
            // A JSON string also works
            'props' => $serializer->serialize(
                ['recipe' => $recipe,
                 'baseUrl' => $this->generateUrl('homepage'),
                 'location' => $request->getRequestUri()
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
            'props' => $serializer->normalize(
                ['recipes' => $this->get('recipes.repository.recipe')->findAll(),
                // '/' or maybe '/app_dev.php/', so the React Router knows about the root
                 'baseUrl' => $this->generateUrl('homepage'),
                 'location' => $request->getRequestUri()
                ])
        ]);
    }

    /**
     * @Route("/redux/recipe/{slug}", name="recipe_redux")
     */
    public function recipeReduxAction($slug, Request $request)
    {
        $serializer = $this->get('serializer');
        if (!$recipe = $this->get('recipes.repository.recipe')->findOneBySlug($slug)) {
            throw $this->createNotFoundException('The recipe does not exist');
        }
        return $this->render('recipe-redux/recipe.html.twig', [
            // A JSON string also works
            'props' => $serializer->serialize(
                ['recipe' => $recipe,
                 'baseUrl' => $this->generateUrl('homepage'),
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
        return new JsonResponse($serializer->normalize($this->get('recipes.repository.recipe')->findAll()));
    }

    /**
     * @Route("/api/recipes/{slug}", name="api_recipe")
     *
     * Needed for client-side navigation after initial page load
     */
    public function apiRecipeAction($slug, Request $request)
    {
        $serializer = $this->get('serializer');
        return new JsonResponse($serializer->normalize($this->get('recipes.repository.recipe')->findOneBySlug($slug)));
    }

    /**
     * @Route("/liform/", name="liform")
     */
    public function liformAction(Request $request)
    {
        $task = new Task();
        $serializer = $this->get('serializer');
        $form = $this->createForm(TaskType::Class, $task,
            array('csrf_protection' => false)
        );
        return $this->render('liform/index.html.twig', [
            'props' => json_encode([
                'schema' => $this->get('liform')->transform($form),
                    'initialValues' => $serializer->normalize($form->createView()),
                    'location' => $request->getRequestUri()
                ])
            ]);
    }

    /**
     * @Route("/liform/tasks", methods={"POST"}, name="liform_post")
     */
    public function liformPostAction(Request $request)
    {
        $task = new Task();
        $data = json_decode($request->getContent(), true);
        $form = $this->createForm(TaskType::Class, $task,
            array('csrf_protection' => false)
        );
        $form->submit($data);
        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($task);
            $em->flush();

            return new Response(null, 201);
        }
        $serializer = $this->get('serializer');
        return new JsonResponse($serializer->normalize($form), 400);
    }

}
