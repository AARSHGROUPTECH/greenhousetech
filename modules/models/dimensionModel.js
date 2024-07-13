const mongoose = require("mongoose");

const dimensionSchema = new mongoose.Schema({
  dimensionName: {
    type: String,
    required: [true, "Dimension Name required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Dimension", dimensionSchema);
