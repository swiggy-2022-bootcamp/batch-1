const mongoose = require("mongoose");
const { Schema } = mongoose;

const FoodSchema = new Schema({
  id: { type: Number },
  foodId: { type: Number, required: true, unique: true },
  foodName: { type: String, required: true },
  foodCost: { type: String, required: true },
  foodType: { type: String, enum: ["Indian", "Chinese", "Mexican"] },
});

const CounterSchema = Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 },
});

const counter = mongoose.model("counter", CounterSchema);

FoodSchema.pre("save", async function (next) {
  const doc = this;
  console.log(doc, "line no 244444");
  let countInstance = await counter.findByIdAndUpdate(
    { _id: "entityId" },
    { $inc: { seq: 1 } }
  );
  doc.id = countInstance.seq;
});

module.exports = FoodSchema;
