// config
require("dotenv").config();
const JWT = require("jsonwebtoken");
const adminModel = require("../models/adminModel");

const isAuth = async (req, res, next) => {
  // get token
  const { token } = req.headers;
  console.log("token", token);

  // validation
  if (!token) {
    return res.status(401).send({
      success: false,
      message: "UnAuthorized User",
    });
  }

  // Verify token
  const decodeData = JWT.verify(token, process.env.JWT_SECRET);
  req.user = await adminModel.findById(decodeData._id);
  console.log("decodeData", decodeData);

  next();
};

module.exports = isAuth;
