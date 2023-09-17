<?php

/**
 * The AuthModel class for handling authentication-related database operations.
 *
 * This class extends the Model class and provides methods for finding a user by credentials (username and password)
 * and updating a user's token in the database.
 */

namespace Models;

use System\Model;
use Dtos\AuthDto;
use stdClass;

class AuthModel extends Model
{

    /**
     * Finds a user record by credentials (username and password).
     *
     * @param object $body The request body containing username and password.
     * @return object|null The user record as an object, or null if not found.
     */
    public function findByCredentials($body)
    {
        $auth = new AuthDto();
        $auth->username = $body->username;
        $auth->password = md5($body->password);
        return $this->orm->findOne('users', $auth);
    }

    /**
     * Updates a user's token in the database.
     *
     * @param string $token The new token to set for the user.
     * @param int $id The ID of the user whose token is to be updated.
     * @return bool True on success, false on failure.
     */
    public function updateToken($token, $id)
    {
        $user = new stdClass();
        $user->token = $token;
        $where = new stdClass();
        $where->user_id = $id;
        return $this->orm->update('users', $user, $where);
    }
}
