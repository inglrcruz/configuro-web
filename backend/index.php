<?php

require_once 'system/Core.php';

use System\Core;
use System\Router;

$core = new Core();
$core->autoLoad();

$router = new Router();
$prefix = "/v1";

/*
 * --------------------------------------------------------------------
 * User Controller
 * --------------------------------------------------------------------
 */
$users = "users";
$router->get("$prefix/$users", 'UserController@index');
$router->post("$prefix/$users", 'UserController@store');
$router->get("$prefix/$users/{id}", 'UserController@show');
$router->put("$prefix/$users/{id}", 'UserController@update');
$router->delete("$prefix/$users/{id}", 'UserController@destroy');

/*
 * --------------------------------------------------------------------
 * Auth Controller
 * --------------------------------------------------------------------
 */
$router->post("$prefix/sign-in", 'AuthController@signIn');
$router->post("$prefix/sign-off", 'AuthController@signOff');

$router->dispatch();
