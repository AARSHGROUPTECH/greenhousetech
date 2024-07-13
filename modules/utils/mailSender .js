// utils/mailSender.js
const nodemailer = require("nodemailer");

// config
require("dotenv").config();

const mailSender = async (email, title, body) => {
  try {
    // Create a Transporter to send emails
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "avinashkoshty@gmail.com",

        // Note: - This password for demo checking is must. These are generate by 2 step. First get Password of gmail account for SMTP security, then go first Account security >>click two step verification >> generate password app
        pass: "hlajdcumwncadqjp",
      },
    });

    console.log("transporter", transporter);
    // Send emails to users
    let info = await transporter.sendMail({
      from: "avinashkoshty@gmail.com",
      to: email,
      subject: title,
      html: body,
    });
    console.log("Email info: ", info);
    return info;
  } catch (error) {
    console.log("Provide Crednetial getting Error API", error);
    throw error;
  }
};
module.exports = mailSender;
