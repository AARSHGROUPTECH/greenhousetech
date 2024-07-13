const express = require("express");

//defineRoute
const router = express.Router();

//Controller define
const {
  verifyOtpController,
  sentOtpController,
} = require("../controllers/otpController");

//define route
router.post("/admin/otp-send", sentOtpController);
router.post("/admin/otp-verify", verifyOtpController);

//exports router
module.exports = router;
