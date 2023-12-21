// Responsible for /auth/* routes

const express = require('express');
const router = express.Router();

const { register, login, logout } = require('../controllers/auth.js');

// 1. Check if user is existing. If existing -> registration fails
// 2. Hash (secure) the password
// 3. Insert the newly registered user into user table
router.post("/register", register);


router.post("/login", login);


router.post("/logout", logout);

// Export the router
module.exports = router;
