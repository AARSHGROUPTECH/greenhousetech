const mongoose = require("mongoose");

const variantSchema = new mongoose.Schema({
  variantName: {
    type: String,
    required: [true, "variant variantName required"],
  },
  unitPrice: {
    type: String,
    required: [true, "variant unitPrice required"],
  },
  inputFields: {
    type: Array,
    required: [true, "variant inputFields required"],
  },
  attribute: {
    type: String,
    required: [true, "variant attribute required"],
  },
  variantFile: {
    type: String,
    required: [true, "variant variantFile required"],
  },
  componentId: {
    type: String,
    required: [true, "variant componentId required"],
  },
  component: {
    type: Array,
    required: [true, "variant component required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Variant", variantSchema);
