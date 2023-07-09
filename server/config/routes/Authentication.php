<?php
	use App\Controller\AuthenticationController;
	use Symfony\Component\Routing\Loader\Configurator\RoutingConfigurator;

	return function (RoutingConfigurator $routes): void {
		$routes->add('login', '/login')->controller([AuthenticationController::class, 'login']);
		$routes->add('register', '/register')->controller([AuthenticationController::class, 'register']);
	};