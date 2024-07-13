const express = require("express");
const router = express.Router();
const isAuth = require("../middleware/auth");

//Import Controller
const {
  getFollowUpController,
  createFollowUpController,
  updateFollowUpController,
  deleteFollowUpController,
} = require("../controllers/followUpController");

//Route configure
router.post("/admin/create-followup/:id", createFollowUpController);
router.get("/admin/get-followup/:id", getFollowUpController);
router.put("/admin/update-followup/:id", updateFollowUpController);
router.delete("/admin/delete-followup/:id", deleteFollowUpController);

module.exports = router;
