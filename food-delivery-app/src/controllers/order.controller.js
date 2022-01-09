const httpStatus = require('http-status');
const { orderService } = require('../services');

const getOrder = async (req, res, next) => {
  const id = req.params.orderId;
  const order = await orderService.getOrderById(id);
  if (order) {
    await res.status(httpStatus.OK);
    await res.send(order);
  } else {
    await res.status(httpStatus.NOT_FOUND);
    await res.send(`Sorry order with ${id} not found`);
  }
};

const getOrdersByUser = async (req, res, next) => {
  const id = req.params.userId;
  const orders = await orderService.getOrdersByUserId(id);

  if (orders) {
    await res.status(httpStatus.OK);
    await res.send(orders);
  } else {
    await res.status(httpStatus.NOT_FOUND);
    await res.send(`Sorry order(s) for user: ${id} not found`);
  }
};

const updateOrder = async (req, res, next) => {
  const id = req.params.orderId;
  const order = await orderService.updateOrderInfo(id, req.body);

  if (order) {
    await res.status(httpStatus.OK).send(order);
  } else {
    await res.status(httpStatus.NOT_FOUND);
    await res.send(`Sorry order with ${id} not found`);
  }
};

const createOrder = async (req, res, next) => {
  const body = req.body;
  const order = await orderService.createOrder(body);

  if (order) {
    await res.status(httpStatus.CREATED);
    await res.send(order);
  } else {
    await res.status(httpStatus.INTERNAL_SERVER_ERROR);
    await res.send({ message: 'Something went wrong' });
  }
};

module.exports = {
  getOrder,
  getOrdersByUser,
  createOrder,
  updateOrder,
};
