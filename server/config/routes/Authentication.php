<?php

use App\Controller\AuthenticationController;
use Symfony\Component\Routing\Loader\Configurator\RoutingConfigurator;

return function (RoutingConfigurator $routes): void {
	$routes->add('login', '/api/login')->controller([AuthenticationController::class, 'login']);
	$routes->add('register', '/api/register')->controller([AuthenticationController::class, 'register']);
};
