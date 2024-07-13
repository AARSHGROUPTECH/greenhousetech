const express = require("express");
const router = express.Router();
// const isAuth = require("../middleware/auth");

//Import Controller
const {
  createProjectController,
  getProjectController,
  updateProjectController,
  deleteProjectController,
} = require("../controllers/projectTypeController");
//Route configure

//Routes
router.post("/admin/create-project", createProjectController);
router.get("/admin/get-project", getProjectController);
router.put("/admin/update-project/:id", updateProjectController);
router.delete("/admin/delete-project/:id", deleteProjectController);

module.exports = router;
