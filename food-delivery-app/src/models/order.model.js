const mongoose = require('mongoose');

const orderSchema = mongoose.Schema(
  {
    orderId: {
      type: Number,
      required: true,
    },
    userId: {
      type: Number,
      required: true,
    },
    foodList: {
      type: [Number],
      required: true,
    },
    orderCost: {
      type: Number,
      required: true,
      trim: true,
    },
    deliveryStatus: {
      type: Boolean,
      required: true,
    },
    orderTime: {
      type: Date,
      default: Date.now,
      required: true,
    },
    deliveryTime: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: false,
  }
);

const Order = mongoose.model('Food', v);

module.exports.Order = Order;
module.exports.orderSchema = orderSchema;
