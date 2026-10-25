
const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema(
  {
    item_name: {
      type: String,
      required: true,
      trim: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 0
    },
    unit: {
      type: String,
      required: true
    },
    reorder_level: {
      type: Number,
      required: true,
      min: 0
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Inventory", inventorySchema);
