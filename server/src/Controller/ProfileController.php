<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class ProfileController extends AbstractController
{
    #[Route('/profile', name: 'app_profile')]
    public function index(Request $request, ManagerRegistry $doctrine): Response
    {
        $parameters = json_decode($request->getContent(), true);
        // $users = $doctrine->getRepository(User::class)->findBy();
        return $this->json(['users' => 'oeu']);
    }
}
