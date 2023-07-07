<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;

class AuthenticationController extends AbstractController
{
    #[Route('/register', name: 'register', methods: "post")]
    public function registration(EntityManagerInterface $entityManager, UserPasswordHasherInterface $passwordHasher, Request $request)
    {
        $parameters = json_decode($request->getContent(), true);
        $name = $parameters['name'];
        $surename = $parameters['surename'];
        $login = $parameters['login'];
        $password = $parameters['password'];
        $phone_number = $parameters['phone_number'];
        $profile_picture = $parameters['profile_picture'];
        
        $user = new User();

        $hashedPassword = $passwordHasher->hashPassword(
            $user,
            $password
        );

        $user->setName($name);
        $user->setSurename($surename);
        $user->setLogin($login);
        $user->setPhoneNumber($phone_number);
        $user->setProfilePicture($profile_picture);
        $user->setPassword($hashedPassword);

        $entityManager->persist($user);
        $entityManager->flush();
        return $this->json(['message' => 'User registered successfully'], Response::HTTP_CREATED);
    
    }

    #[Route('/login', name: 'login', methods: "post")]
    public function login(EntityManagerInterface $entityManager, Request $request, UserPasswordHasherInterface $passwordHasher): JsonResponse
    {
        $credentials = json_decode($request->getContent(), true);
        $login = $credentials['login'];
        $password = $credentials['password'];

        $userRepository =  $entityManager->getRepository(User::class);
        $user = $userRepository->findOneBy(['login' => $login]);
        $hashedPassword = $passwordHasher->hashPassword(
            $user,
            $password
        );
        if (!$user) {
            return $this->json(['error' => 'Invalid login credentials.']);
        }
        
        if (!$passwordHasher->isPasswordValid($user, $password)) {
            return $this->json(['error' => 'Invalid login credentials.']);
        }

        return $this->json(['message' => 'Logged in successfully']);
    }

    
}
