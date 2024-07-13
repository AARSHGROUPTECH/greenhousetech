const express = require("express");
const router = express.Router();
// const isAuth = require("../middleware/auth");

//Import Controller
const {
  createClientTypeController,
  getClientTypeController,
  updateClientTypeController,
  deleteClientTypeController,
} = require("../controllers/clientTypeController");
//Route configure

//Routes
router.post("/admin/create-clienttype", createClientTypeController);
router.get("/admin/get-clienttype", getClientTypeController);
router.put("/admin/update-clienttype/:id", updateClientTypeController);
router.delete("/admin/delete-clienttype/:id", deleteClientTypeController);

module.exports = router;
