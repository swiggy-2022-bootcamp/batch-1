const mongoose = require("mongoose");
const { Schema } = mongoose;

const CounterSchema = new Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 },
});

module.exports = CounterSchema;
