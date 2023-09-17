<?php

/**
 * The AuthController class for handling user authentication-related actions.
 *
 * This class extends the Controller class and provides methods for user sign-in and sign-off.
 */

use Config\Security;
use System\Controller;
use Models\AuthModel;
use Dtos\AuthDto;

class AuthController extends Controller
{

    private $model;
    private $security;
    private $authDto;

    /**
     * Constructor for the AuthController class.
     * Initializes the model, security, and authDto instances.
     */
    public function __construct()
    {
        $this->model = new AuthModel();
        $this->security = new Security();
        $this->authDto = new AuthDto();
    }

    /**
     * Signs a user in if the provided credentials are valid, the account is active, and issues a token.
     */
    public function signIn()
    {
        $valid = $this->authDto->validate($this->body());
        if (!$valid->valid) {
            $this->response($valid->errors, 400);
        } else {
            $user = $this->model->findByCredentials($this->body());
            if (empty($user)) $this->response(["message" => "Username or password is incorrect."], 404);
            if (!$user->active) $this->response(["message" => "This account is disabled. Please contact support for more information."], 403);
            $token = uniqid(bin2hex(random_bytes(16)), true);
            $this->model->updateToken($token, $user->user_id);
            $this->response(["token" => $token], 201);
        }
    }

    /**
     * Signs a user off by invalidating their token.
     */
    public function signOff()
    {
        $user_id = $this->security->validatToken();
        $this->model->updateToken(null, $user_id);
        $this->response([], 201);
    }
}
