<?php

/**
 * The UserController class for managing user-related actions.
 *
 * This class extends the Controller class and provides methods for listing, creating, viewing, updating, and deleting user records.
 */

use Config\Security;
use System\Controller;
use Models\UserModel;
use Dtos\UserDto;

class UserController extends Controller
{

    private $model;
    private $security;
    private $userDto;

    /**
     * Constructor for the UserController class.
     * Initializes the model, security, and userDto instances.
     */
    public function __construct()
    {
        $this->model = new UserModel();
        $this->security = new Security();
        $this->userDto = new UserDto();
    }

    /**
     * Retrieves a list of all users.
     * Requires a valid token for access.
     */
    public function index()
    {
        $this->security->validatToken();
        $list = $this->model->findAll();
        $this->response($list);
    }

    /**
     * Stores a new user if the provided data is valid and the username is not already in use.
     * Requires a valid token for access.
     */
    public function store()
    {
        $valid = $this->userDto->validate($this->body());
        if (!$valid->valid) {
            $this->response($valid->errors, 400);
        } else {
            $exist = $this->model->findByUsername($this->body()->username);
            if ($exist) {
                $this->response(["message" => "This username is already in use."], 404);
            } else {
                $this->model->store($this->body());
                $this->response([], 201);
            }
        }
    }

    /**
     * Retrieves a user by their ID.
     * Requires a valid token for access.
     *
     * @param int $id The ID of the user to retrieve.
     */
    public function show($id)
    {
        $this->security->validatToken();
        $user = $this->model->findById($id);
        if ($user) {
            $this->response($user);
        } else {
            $this->response(["message" => "No user found with the provided ID."], 404);
        }
    }

    /**
     * Updates a user's information if the provided data is valid and the user exists.
     * Requires a valid token for access.
     *
     * @param int $id The ID of the user to update.
     */
    public function update($id)
    {
        $this->security->validatToken();
        $valid = $this->userDto->validate($this->body());
        if (!$valid->valid) {
            $this->response($valid->errors, 400);
        } else {
            $user = $this->model->findById($id);
            if ($user) {
                $this->model->update($this->body(), $id);
                $this->response([], 201);
            } else {
                $this->response(["message" => "No user found with the provided ID."], 404);
            }
        }
    }

    /**
     * Deletes a user by their ID if the user exists.
     * Requires a valid token for access.
     *
     * @param int $id The ID of the user to delete.
     */
    public function destroy($id)
    {
        $this->security->validatToken();
        $user = $this->model->findById($id);
        if ($user) {
            $this->model->delete($id);
            $this->response([]);
        } else {
            $this->response(["message" => "No user found with the provided ID."], 404);
        }
    }
}
