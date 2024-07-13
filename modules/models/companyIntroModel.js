const mongoose = require("mongoose");

const companyIntroSchema = new mongoose.Schema({
  companyIntroType: {
    type: String,
    required: [true, "companyIntro ProductName required"],
  },
  companyIntroSubject: {
    type: String,
    required: [true, "companyIntro Name required"],
  },
  companyIntroMisc: {
    type: Array,
    required: [true, "companyIntro Name required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("CompanyIntro", companyIntroSchema);
