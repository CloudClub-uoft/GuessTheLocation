// Responsible for /guesses/* routes

const express = require('express');
const router = express.Router();

const {insert_coords} = require('../controllers/guess.js');

router.post('/',insert_coords);

module.exports = router;
