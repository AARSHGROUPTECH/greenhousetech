const mongoose = require("mongoose");

const followUpSchema = new mongoose.Schema({
  quotationReviseId: {
    type: String,
    required: [true, "followUp quotationReviseId required"],
  },
  followupDatetime: {
    type: String,
    required: [true, "followUp followupDatetime required"],
  },
  followupSummary: {
    type: String,
    required: [true, "followUp followupSummary required"],
  },
  followedBy: {
    type: String,
    required: [true, "followUp followedBy required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("QuotationReviseFollowUp", followUpSchema);
