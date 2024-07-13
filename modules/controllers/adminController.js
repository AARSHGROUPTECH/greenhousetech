const cookie = require("cookie-parser");
const fileSystem = require("file-system");
const fs = require("fs");
const adminModel = require("../models/adminModel");
const otpModel = require("../models/otpModel");

// config
require("dotenv").config();

//file extend node fs origin methods, and overwrite some methods with next list chart
fileSystem.readFile === fs.readFile;

// createAdminController
const createAdminController = async (req, res) => {
  try {
    const { name, email, password, contact, address, userType } = req.body;

    //Validation
    if (!name || !email || !password || !contact || !address || !userType) {
      return res.status(404).send({
        success: false,
        message: "Please Provide all Admin fields",
      });
    }

    // isExist validation
    const isExistEmail = await adminModel.findOne({ email });
    // console.log("isExistEmail", isExistEmail);
    if (isExistEmail) {
      return res.status(404).send({
        success: false,
        message: "Admin's email already Exist",
      });
    }

    // console.log("req.files.profilePic[0].path", req.files.profilePic[0].path);
    // user
    const user = await adminModel.create({
      name,
      email,
      password,
      contact,
      address,
      userType,
      profilePic: req.files.profilePic[0].path,
    });

    // console.log("create-user", user);
    res.status(200).send({
      success: true,
      message: "Admin Profile Created Successfully API",
      user,
    });
  } catch (error) {
    // console.log("Admin create getting error", error);
    res.status(500).send({
      success: false,
      message: "Admin create getting error",
    });
  }
};

// getAdminController
const getAdminController = async (req, res) => {
  try {
    const user = await adminModel.find({});
    // console.log("user", user);

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Admin data getting faild API",
      });
    }

    res.status(200).send({
      success: true,
      message: "Admin Profile getting Successfully API",
      user,
    });
  } catch (error) {
    // console.log("Admin Profile getting error", error);
    res.status(500).send({
      success: false,
      message: "Admin Profile getting error",
    });
  }
};

// loginAdminController
const loginAdminController = async (req, res) => {
  try {
    const { email, password } = req.body;

    //Validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Please Provide Valid Admin Login field API",
      });
    }

    // get password
    const user = await adminModel.findOne({ email: req.body.email });
    // console.log("loginAdmin", user);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not Found",
      });
    }

    // compare password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(500).send({
        success: false,
        message: "Invalid credentials",
      });
    }

    //token generate and expires in 7 days
    const token = user.generateToken();
    res.status(200).send({
      success: true,
      message: "Admin Profile Login Successfully API",
      token,
      user,
    });
  } catch (error) {
    // console.log("Admin Login getting error", error);
    res.status(500).send({
      success: false,
      message: "Admin Login getting error",
    });
  }
};

// updateAdminController
const updateAdminController = async (req, res) => {
  try {
    // get Admin data
    const user = await adminModel.findByIdAndUpdate({ _id: req.params.id });
    // console.log("user", user);

    const { name, email, password, contact, address, userType } = req.body;

    //Validation
    if (name) user.name = name;
    if (password) user.password = password;
    if (email) user.email = email;
    if (contact) user.contact = contact;
    if (address) user.address = address;
    if (userType) user.userType = userType;

    //profilePic
    if (user.profilePic) {
      fs.unlink("." + user.profilePic, (err) => {
        if (err) {
          // console.log(err);
        }
      });
    }

    if (
      Array.isArray(req.files.profilePic) &&
      req.files.profilePic.length > 0
    ) {
      await fs.promises.unlink(user.profilePic);
      user.profilePic = req.files.profilePic[0].path;
    }

    // if (req.files.profilePic[0].path.length != 0) {
    //   await fs.promises.unlink(user.profilePic);
    //   user.profilePic = req.files.profilePic[0].path;
    // }

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Admin Profile update get error API",
      });
    }

    // save File
    await user.save();
    res.status(200).send({
      success: true,
      message: "Admin Profile update Successfully API",
    });
  } catch (error) {
    // console.log("Admin update getting error", error);
    res.status(500).send({
      success: false,
      message: "Admin update getting error",
    });
  }
};

// deleteAdminController
const deleteAdminController = async (req, res) => {
  try {
    // get Admin data
    const deleteAdmin = await adminModel.findByIdAndDelete({
      _id: req.params.id,
    });

    // console.log("deleteAdmin", deleteAdmin);

    if (!deleteAdmin) {
      return res.status(400).send({
        success: false,
        message: "Admin Profile delete get not exist Id API",
      });
    }

    await fs.promises.unlink(deleteAdmin.profilePic);

    // save File
    res.status(200).send({
      success: true,
      message: "Admin Profile delete Successfully API",
      deleteAdmin,
    });
  } catch (error) {
    // console.log("Admin Profile delete getting error API", error);
    res.status(500).send({
      success: false,
      message: "Admin Profile delete getting error API",
    });
  }
};

//forgotPasswordAdminController
const forgotPasswordAdminController = async (req, res) => {
  try {
    // get Admin data
    const getMail = await otpModel.find({});

    let elm = "";
    for (let i = 0; i < getMail.length; i++) {
      elm = getMail[i];
    }

    // console.log("elm", elm);
    // console.log("getMail_", getMail);
    const user = await adminModel.findOne({ email: elm.email });
    // console.log("user_", user);

    //Validation
    if (!password) {
      return res.status(404).send({
        success: false,
        message: "Please Provide  Admin credential for forgot API",
      });
    }

    //Updation
    if (password) user.password = password;

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Admin Profile update get error API",
      });
    }

    // save File
    await user.save();
    res.status(200).send({
      success: true,
      message: "Admin Credential update Successfully API",
    });
  } catch (error) {
    // console.log("Admin Credential update getting error", error);
    res.status(500).send({
      success: false,
      message: "Admin Credential update getting error",
    });
  }
};

//Exports controller
module.exports = {
  createAdminController,
  getAdminController,
  loginAdminController,
  updateAdminController,
  deleteAdminController,
  forgotPasswordAdminController,
};
