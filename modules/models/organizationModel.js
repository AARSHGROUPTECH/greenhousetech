const mongoose = require("mongoose");

const organizationSchema = new mongoose.Schema(
  {
    organisationName: {
      type: String,
    },
    organisationAddress: {
      type: String,
    },
    taxResidency: {
      type: String,
    },
    businessType: {
      type: String,
    },
    financialYear: {
      type: String,
    },
    email: {
      type: String,
      minlength: 5,
    },
    billingAddress: {
      type: String,
    },
    shippingAddress: {
      type: String,
    },
    gstNumber: {
      type: String,
    },
    websiteLink: {
      type: String,
    },
    bookingDate: {
      type: String,
    },
    contact: {
      type: String,
    },
    organizationPick: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Organization", organizationSchema);
