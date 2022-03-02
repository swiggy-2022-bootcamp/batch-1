const express = require('express');
const router = express.Router();

const cartController = require('../controllers/cartController.js');

// PUT request to modify cart of an user
router.put('/:userID', cartController.modifyCart);

// GET request for details of cart of an user
router.get('/:userID', cartController.cartDetails);

module.exports = router;