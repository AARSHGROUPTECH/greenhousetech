const mongoose = require("mongoose");

const businessTypeSchema = new mongoose.Schema({
  businessName: {
    type: String,
    required: [true, "BusinessType Name required"],
  },
  status: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("BusinessType", businessTypeSchema);
