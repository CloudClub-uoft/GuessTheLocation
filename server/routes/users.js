// Responsible for /users/* routes

const express = require('express');
const db = require('../config/db').default;
const router = express.Router();

const { getUsers, getUserWithId, createUser, deleteUserWithId } = require('../controllers/user.js');

// Database query to get all users
router.get('/', getUsers);

// Database query to get the user with id=id
router.get('/:userId', getUserWithId);

// Delete user
router.delete('/:userId', deleteUserWithId);

// Export the router
module.exports = router;
