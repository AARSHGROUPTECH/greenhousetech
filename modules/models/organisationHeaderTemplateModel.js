const mongoose = require("mongoose");

const organisationHeaderTemplateSchema = new mongoose.Schema(
  {
    organisationMsmeReg: {
      type: String,
      required: [true, "organisationHeader required"],
    },
    organisationHeader: {
      type: String,
      required: [true, "organisationHeader required"],
    },
    organisationFooter: {
      type: String,
      required: [true, "organisationFooter required"],
    },
    organisationGreetings: {
      type: Array,
      required: [true, "organisationGreetings required"],
    },
    organizationLogo: {
      type: String,
      required: [true, "organizationLogo required"],
    },
    orgCertificateLogo: {
      type: String,
      required: [true, "orgCertificateLogo required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "OrganisationHeaderTemplate",
  organisationHeaderTemplateSchema
);
