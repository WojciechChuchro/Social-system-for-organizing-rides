<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Entity\User;

class UsersController extends AbstractController
{
	public function getSingleUser(EntityManagerInterface $entityManager, Request $request): JsonResponse
	{
		$parameters = json_decode($request->getContent(), true);
		$id_user = $parameters['id_user'];
		$user = $entityManager->getRepository(User::class)->findOneBy(['id_user' => $id_user]);;

		if (!$user) {
			return $this->json(["error" => "User with current id doesn't exist."]);
		}

		return $this->json([
			"message" => "Get single user completed Sucesfully",
			"user" => [
				"id_user" => $user->getId(),
				"name" => $user->getName(),
				"surename" => $user->getSurename(),
				"login" => $user->getLogin(),
				"phone_number" => $user->getPhoneNumber(),
				"profile_picture" => $user->getProfilePicture()
			]
		]);
	}
}
