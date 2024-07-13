const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  businessName: {
    type: String,
    required: [true, "client name required"],
  },
  businessType: {
    type: String,
    required: [true, "client businessType required"],
  },
  contactPersonName: {
    type: String,
    required: [true, "client contactPersonName required"],
  },
  mobile: {
    type: String,
    required: [true, "client mobile required"],
  },
  email: {
    type: String,
    required: [true, "client email required"],
  },
  gstNumber: {
    type: String,
    required: [true, "client gstNumber required"],
  },
  websiteLink: {
    type: String,
    required: [true, "client websiteLink required"],
  },
  referenceName: {
    type: String,
    required: [true, "client referenceName required"],
  },
  state: {
    type: String,
    required: [true, "client State required"],
    
  },
  city: {
    type: String,
    required: [true, "client city required"],
  },
  billingAddress: {
    type: String,
    required: [true, "client billingAddress required"],
  },
  shippingAddress: {
    type: String,
    required: [true, "client shippingAddress required"],
  },
  pinCode: {
    type: Number,
    required: [true, "client pinCode required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Client", clientSchema);
