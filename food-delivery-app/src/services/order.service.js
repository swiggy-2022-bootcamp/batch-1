const { Order } = require('../models');
// const httpStatus = require('http-status');
// const ApiError = require('../utils/ApiError');

async function getOrderById(id) {
  try {
    const Order = await Order.findById(id).exec();
    if (Order) {
      // const OrderData = extractOrderInfo(Order);
      return Order;
    }
  } catch (error) {
    console.log(error.message);
  }
}

async function createOrder(OrderBody) {
  const newOrder = await Order.create(OrderBody);
  // const OrderData = extractOrderInfo(newOrder);
  if (newOrder) return newOrder;
  else {
    return null;
  }
}

async function updateOrderInfo(id, OrderBody) {
  try {
    const Order = await Order.findOneAndUpdate({ _id: id }, OrderBody).exec();
    if (Order) {
      // const OrderData = extractOrderInfo(Order);
      return Order;
    }
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  getOrderById,
  createOrder,
  updateOrderInfo,
};
