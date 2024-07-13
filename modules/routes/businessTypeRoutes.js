const express = require("express");
const router = express.Router();

//Import Controller
const {
  getBusinessTypeController,
  createBusinessTypeController,
  updateBusinessTypeController,
  deleteBusinessTypeController,
} = require("../controllers/businessTypeController");
// const isAuth = require("../middleware/auth");

//Route configure
router.post("/admin/create-businesstype", createBusinessTypeController);
router.get("/admin/get-businesstype", getBusinessTypeController);
router.put(
  "/admin/update-businesstype/:id",

  updateBusinessTypeController
);
router.delete("/admin/delete-businesstype/:id", deleteBusinessTypeController);

module.exports = router;
