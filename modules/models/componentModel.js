const mongoose = require("mongoose");

const componentSchema = new mongoose.Schema({
  componentProductName: {
    type: String,
    required: [true, "component ProductName required"],
  },
  componentName: {
    type: String,
    required: [true, "component Name required"],
  },
  componentVariant: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Variant",
    },
  ],
  inputFields: {
    type: Array,
    required: [true, "component inputFields required"],
  },
  attribute: {
    type: String,
    required: [true, "component attribute required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Component", componentSchema);
