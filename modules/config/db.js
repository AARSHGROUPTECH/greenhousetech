const mongoose = require("mongoose");

// config
require("dotenv").config();

const connectDb = () => {
  try {
    mongoose
      .connect(process.env.MONGO_URL)
      .then((data) => {
        console.log("Database connected successfully");
      })
      .catch((error) => {
        console.log("Database connection getting error", error);
      });
  } catch (error) {
    console.log("Database connection getting error", error);
  }
};

module.exports = connectDb;
