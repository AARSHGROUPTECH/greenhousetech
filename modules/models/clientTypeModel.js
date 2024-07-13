const mongoose = require("mongoose");

const clientTypeSchema = new mongoose.Schema({
  clientTypeBusiness: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("ClientType", clientTypeSchema);
