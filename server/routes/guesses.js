// Responsible for /guesses/* routes

const express = require('express');
const router = express.Router();

const {insert_coords, processGuess} = require('../controllers/guess.js');

router.post('/',insert_coords);

router.post('/process_guess', processGuess);

module.exports = router;
