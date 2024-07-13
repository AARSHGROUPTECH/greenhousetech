const mongoose = require("mongoose");

const paymentTermsSchema = new mongoose.Schema({
  paymentTermsType: {
    type: String,
    required: [true, "paymentTerms paymentTermsType required"],
  },
  paymentTermsMisc: {
    type: Array,
    required: [true, "paymentTerms Name required"],
  },
  paymentTermsGreetings: {
    type: String,
    required: [true, "paymentTerms Name required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("PaymentTerms", paymentTermsSchema);
