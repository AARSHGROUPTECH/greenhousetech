const express = require("express");
const router = express.Router();

//Import Controller
const {
  createAdminController,
  getAdminController,
  loginAdminController,
  updateAdminController,
  deleteAdminController,
  forgotPasswordAdminController,
} = require("../controllers/adminController");
const uploads = require("../fileUploads/uploads");
const isAuth = require("../middleware/auth");

//Route configure

//Routes
router.post("/admin/create-profile", uploads, createAdminController);
router.get("/admin/get-profile", getAdminController);
router.post("/admin/login-profile", loginAdminController);
router.put("/admin/update-profile/:id", uploads, updateAdminController);
router.delete("/admin/delete-profile/:id", deleteAdminController);
router.put("/admin/forgotpassword-profile", forgotPasswordAdminController);

module.exports = router;
