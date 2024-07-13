const adminModel = require("../models/adminModel");
const otpGenerator = require("otp-generator");
const otpModel = require("../models/otpModel");

// config
require("dotenv").config();

//emailSentController
const sentOtpController = async (req, res) => {
  // try {
  let Data = await adminModel.findOne({ email: req.body.email });

  //Validation
  if (Data) {
    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    let result = await otpModel.findOne({ otp: otp });
    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
      });
      result = await otpModel.findOne({ otp: otp });
    }

    const otpPayload = { email: Data.email, otp };
    const otpBody = await otpModel.create(otpPayload);

    if (otpBody) {
      return res.status(200).send({
        success: true,
        message: "OTP sent successfully",
        otp,
      });
    }
  } else {
    return res.status(404).send({
      success: false,
      message: "invalid OTP data getting error API",
    });
  }
};

//verifyOtpController
const verifyOtpController = async (req, res) => {
  try {
    const { otp } = req.body;
    // Find the most recent OTP for the email
    const response = await otpModel
      .findOne({ otp })
      .sort({ createdAt: -1 })
      .limit(1);
    if (response.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Enter OTP is not valid",
      });
    }

    // save File
    await response.save();
    res.status(200).send({
      success: true,
      message: "Authentication Verified successfully API",
      response,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: `Hashing password error for: ` + error.message,
      error,
    });
  }
};

module.exports = {
  sentOtpController,
  verifyOtpController,
};
