const express = require("express");
const router = express.Router();
// const isAuth = require("../middleware/auth");

//Import Controller
const {
  createComponentController,
  getComponentController,
  updateComponentController,
  deleteComponentController,
} = require("../controllers/componentController");

//Route configure
router.post("/admin/create-component", createComponentController);
router.get("/admin/get-component", getComponentController);
router.put("/admin/update-component/:id", updateComponentController);
router.delete("/admin/delete-component/:id", deleteComponentController);

module.exports = router;
