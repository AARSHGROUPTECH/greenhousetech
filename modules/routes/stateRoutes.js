const express = require("express");
const router = express.Router();

//Import Controller
const {
  getStateController,
  createStateController,
  updateStateController,
  deleteStateController,
} = require("../controllers/stateController");
//Route configure

//Routes
router.post("/admin/create-state", createStateController);
router.get("/admin/get-state", getStateController);
router.put("/admin/update-state/:id", updateStateController);
router.post("/admin/delete-state", deleteStateController);

module.exports = router;
