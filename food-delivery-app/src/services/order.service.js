const { Order } = require('../models');

async function getOrderById(id) {
  try {
    const order = await Order.findById(id).exec();
    if (order) {
      return order;
    }
  } catch (error) {
    console.log(error.message);
  }
}

async function getOrdersByUserId(userId) {
  try {
    const orders = await Order.find({ userId });
    if (orders) {
      return orders;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function createOrder(orderBody) {
  try {
    const newOrder = await Order.create(orderBody);
    if (newOrder) {
      return newOrder;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function updateOrderInfo(id, orderBody) {
  try {
    const order = await Order.findOneAndUpdate({ _id: id }, orderBody, {
      new: true,
    }).exec();
    if (order) {
      return order;
    }
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  getOrderById,
  createOrder,
  updateOrderInfo,
  getOrdersByUserId,
};
