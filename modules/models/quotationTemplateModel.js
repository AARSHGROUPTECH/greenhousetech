const mongoose = require("mongoose");

const QuotationTemplateSchema = new mongoose.Schema({
  orgnisationName: {
    type: String,
    required: [true, "quotation orgnisationName required"],
  },
  orgnisationGSTN: {
    type: String,
    required: [true, "quotation orgnisationGSTN required"],
  },
  orgnisationAddress: {
    type: String,
    required: [true, "quotation orgnisationAddress required"],
  },
  clientType: {
    type: String,
    required: [true, "quotation client required"],
  },
  quotationNumber: {
    type: String,
    required: [true, "quotation quotationNumber required"],
  },
  quotationDate: {
    type: String,
    required: [true, "quotation quotationDate required"],
  },
  projectType: {
    type: String,
    required: [true, "quotation projectType required"],
  },
  unitType: {
    type: String,
    required: [true, "quotation unit required"],
  },
  dimensionLength: {
    type: String,
    required: [true, "quotation dimensionLength required"],
  },
  dimensionWidth: {
    type: String,
    required: [true, "quotation dimensionWidth required"],
  },
  dimensionDepth: {
    type: String,
    required: [true, "quotation dimensionDepth required"],
  },
  volumeLtr: {
    type: String,
    required: [true, "quotation volumeLtr required"],
  },
  durationHr: {
    type: String,
    required: [true, "quotation durationHr required"],
  },
  flowRate: {
    type: String,
    required: [true, "quotation flowRate required"],
  },
  variantData: {
    type: Array,
    required: [true, "quotation variantData required"],
  },
  paymentTermsNo: {
    type: String,
    required: [true, "quotation paymentTermsNo required"],
  },
  headerTemplateNo: {
    type: String,
    required: [true, "quotation headerTemplateNo required"],
  },
  templateNo: {
    type: String,
    required: [true, "quotation templateNo required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("QuotationTemplate", QuotationTemplateSchema);
