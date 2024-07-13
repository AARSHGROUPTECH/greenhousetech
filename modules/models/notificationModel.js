const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  notifications: { type: mongoose.Schema.ObjectId, ref: "Admin" },
});

module.exports = mongoose.model("notification", notificationSchema);
