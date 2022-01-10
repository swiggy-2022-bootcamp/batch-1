const express = require('express');
const authController = require('../controllers/authController');
const auth = require('../service/auth');

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.get('/profile', authController.profile);

module.exports = router;