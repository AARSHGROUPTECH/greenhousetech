const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "admin name required"],
    },
    email: {
      type: String,
      required: [true, "admin email required"],
    },
    password: {
      type: String,
      required: [true, "admin password required"],
      minlength: 5,
    },
    contact: {
      type: String,
      required: [true, "admin contact required"],
    },
    address: {
      type: String,
      required: [true, "admin address required"],
    },
    profilePic: {
      type: String,
    },
    userType: {
      type: String,
      required: [true, "admin userType required"],
    },
  },
  { timestamps: true }
);

adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
});

adminSchema.methods.comparePassword = async function (plainPassword) {
  return await bcrypt.compare(plainPassword, this.password);
};

adminSchema.methods.generateToken = function () {
  return JWT.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

module.exports = mongoose.model("Admin", adminSchema);
