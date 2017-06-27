<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Lexik\Bundle\JWTAuthenticationBundle\TokenExtractor\TokenExtractorInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Exception\InvalidTokenException;
use Lexik\Bundle\JWTAuthenticationBundle\Exception\ExpiredTokenException;
use Lexik\Bundle\JWTAuthenticationBundle\TokenExtractor\CookieTokenExtractor;
use Lexik\Bundle\JWTAuthenticationBundle\Security\Authentication\Token\PreAuthenticationJWTUserToken;

use AppBundle\Entity\Recipe;
use AppBundle\Form\Type\RecipeType;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;

class AdminController extends Controller
{

    /**
     * @Route("/admin/liform/", name="liform")
     */
    public function liformAction(Request $request)
    {
        try {
            $token = $this->getValidToken($request);
            $recipe = new Recipe();
            $serializer = $this->get('serializer');
            $form = $this->createForm(RecipeType::Class, $recipe,
                array('csrf_protection' => false)
            );
            return $this->render('admin/index.html.twig', [
                'authToken' => $token,
                'recipes' => $serializer->normalize($this->get('recipes.repository.recipe')->findAll()),
                'schema' => $this->get('liform')->transform($form),
                'initialValues' => $serializer->normalize($form->createView()),
            ]);
        } catch (\Exception $e) {
            return $this->render('admin/index.html.twig', [
                'authToken' => null,
                'schema' => null,
                'recipes' => [],
                'initialValues' => null,
                'props' => [ ],
                ]);
        }
    }

    /**
     * @Route("/admin/api/form", methods={"GET"}, name="admin_form")
     */
    public function getFormAction(Request $request)
    {
        $recipe = new Recipe();
        $serializer = $this->get('serializer');
        $form = $this->createForm(RecipeType::Class, $recipe,
            array('csrf_protection' => false)
        );
        return new JsonResponse([
            'schema' => $this->get('liform')->transform($form),
            'initialValues' => $serializer->normalize($form->createView()),
        ]);
    }

    /**
     * @Route("/admin/api/recipes", methods={"POST"}, name="liform_post")
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

    private function getValidToken(Request $request) {
        $tokenExtractor = new CookieTokenExtractor('BEARER');

        if (false === ($jsonWebToken = $tokenExtractor->extract($request))) {
            return;
        }

        $preAuthToken = new PreAuthenticationJWTUserToken($jsonWebToken);
        try {
            if (!$payload = $this->get('lexik_jwt_authentication.jwt_manager')->decode($preAuthToken)) {
                throw new InvalidTokenException('Invalid JWT Token');
            }
            $preAuthToken->setPayload($payload);
        } catch (JWTDecodeFailureException $e) {
            if (JWTDecodeFailureException::EXPIRED_TOKEN === $e->getReason()) {
                throw new ExpiredTokenException();
            }
            throw new InvalidTokenException('Invalid JWT Token', 0, $e);
        }
        return $preAuthToken;
    }
}
