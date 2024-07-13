const express = require("express");
const router = express.Router();
// const isAuth = require("../middleware/auth");

//Import Controller
const {
  createClientController,
  getClientController,
  updateClientController,
  deleteClientController,
} = require("../controllers/clientController");

//Route configure
router.post("/admin/create-client", createClientController);
router.get("/admin/get-client", getClientController);
router.put("/admin/update-client/:id", updateClientController);
router.delete("/admin/delete-client/:id", deleteClientController);

module.exports = router;
