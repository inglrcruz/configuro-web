<?php

/**
 * The AuthDto class for handling authentication-related data.
 *
 * This class defines properties for username and password and provides a method for validating request bodies.
 */

namespace Dtos;

class AuthDto
{
    public $username = "";
    public $password = "";

    /**
     * Validates a request body for required fields (username and password).
     *
     * @param object $body The request body to validate.
     * @return object An object containing validation errors (if any) and a validity flag.
     */
    public function validate($body)
    {
        $errors = new \stdClass();
        if (!isset($body->username)) $errors->username = "The username field is required.";
        if (!isset($body->password)) $errors->password = "The password field is required.";
        $response = new \stdClass();
        $response->errors = $errors;
        $response->valid = empty(get_object_vars($errors));
        return $response;
    }
}
