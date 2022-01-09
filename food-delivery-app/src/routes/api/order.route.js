const express = require('express');
const orderController = require('../../controllers/order.controller');

const router = express.Router();

router
  .route('/:orderId')
  .get(orderController.getOrder)
  .put(orderController.updateOrder);

router.route('/user/:userId').get(orderController.getOrdersByUser);

router.route('/').post(orderController.createOrder);

module.exports = router;
