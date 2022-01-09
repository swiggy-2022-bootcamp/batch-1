const express = require('express');
const router = express.Router();

const indexController = require('../controllers/indexController.js')

// POST request to register a new user
router.post('/register', indexController.registerUser);

// POST request to authenticate a existing user
router.post('/authenticate', indexController.authenticateUser);

module.exports = router;