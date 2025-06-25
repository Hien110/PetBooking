const e = require("express");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Order = new Schema(
  {
    products: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          default: 1,
          min: [1, "Số lượng tối thiểu là 1"],
        },
      },
    ],
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    quantity: { type: Number, default: 1 },
    totalPrice: { type: Number },
    status: {
      type: String,
      enum: ["pending", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    address: { type: String },
    phone: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", Order);
