<?php

/**
 * The Model class for managing database interactions.
 *
 */

namespace System;

use Config\Database;
use System\ORM;

class Model
{

    public $orm;

    /**
     * Constructor for the Controller class.
     * Initializes the ORM instance with database configuration.
     */
    public function __construct()
    {
        $configDB = new Database();
        $this->orm = new ORM($configDB->host, $configDB->username, $configDB->password, $configDB->database);
    }
}
