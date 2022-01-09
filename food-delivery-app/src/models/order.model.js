const mongoose = require('mongoose');

const orderSchema = mongoose.Schema(
  {
    userId: {
      type: String,
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
    orderStatus: {
      type: Boolean,
      required: true,
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

const Order = mongoose.model('Order', orderSchema);

module.exports.Order = Order;
module.exports.orderSchema = orderSchema;
