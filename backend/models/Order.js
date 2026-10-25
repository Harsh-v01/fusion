
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    order_date: {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      enum: [
        "Pending",
        "Preparing",
        "Ready",
        "Completed",
        "Cancelled"
      ],
      default: "Pending"
    },
    subtotal: {
      type: Number,
      required: true,
      min: 0
    },
    total_amount: {
      type: Number,
      required: true,
      min: 0
    },
    payment_method: {
      type: String,
      enum: ["Cash", "UPI", "Card", "Other"],
      default: "Other"
    },
    payment_status: {
      type: String,
      enum: ["Pending", "Paid", "Failed", "Refunded"],
      default: "Pending"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
