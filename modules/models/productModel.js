const mongoose = require("mongoose");

const productModel = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productModel);
