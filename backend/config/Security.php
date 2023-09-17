<?php

/**
 * The Security class for handling user authentication and authorization.
 *
 * This class provides methods for retrieving and validating Bearer tokens from the Authorization header.
 * It also validates the Bearer token and checks if it corresponds to a user in the database.
 */

namespace Config;

use Models\UserModel;

class Security
{
    protected $model;

    /**
     * Constructor for the Security class.
     * Initializes the model instance for user-related operations.
     */
    public function __construct()
    {
        $this->model = new UserModel();
    }

    /**
     * Retrieves and returns the Bearer token from the Authorization header.
     *
     * @return string|null The Bearer token or null if not found.
     */
    private function getToken()
    {
        $authorizationHeader = apache_request_headers()['Authorization'];
        if (isset($authorizationHeader) && strpos($authorizationHeader, 'Bearer ') === 0) {
            $bearerToken = substr($authorizationHeader, 7);
            return $bearerToken;
        } else {
            // No valid Bearer token found, return 401 Unauthorized response.
            http_response_code(401);
            die();
        }
    }

    /**
     * Validates the Bearer token, checks if it corresponds to a user, and returns the user's ID.
     * If the token is invalid or not associated with a user, it returns a 401 Unauthorized response.
     *
     * @return int The user's ID if the token is valid.
     */
    public function validatToken()
    {
        $user = $this->model->findByToken($this->getToken());
        if (!empty($user)) {
            return $user->user_id;
        } else {
            // Token is invalid or not associated with a user, return 401 Unauthorized response.
            http_response_code(401);
            die();
        }
    }
}
