<?php

use App\Controller\UsersController;
use Symfony\Component\Routing\Loader\Configurator\RoutingConfigurator;

return function (RoutingConfigurator $routes): void {
	$routes->add('users', '/users')->controller([UsersController::class, 'getEveryUser']);
	$routes->add('userById', '/userById')->controller([UsersController::class, 'getSingleUser']);
};
