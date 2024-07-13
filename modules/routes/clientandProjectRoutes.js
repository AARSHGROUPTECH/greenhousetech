const express = require("express");
const router = express.Router();
// const isAuth = require("../middleware/auth");

//Import Controller
const {
  createClientandProjectController,
  getClientandProjectController,
  updateClientandProjectController,
  deleteClientandProjectController,
  getPrintClientandProjectController,
} = require("../controllers/clientandProjectController");

//Route configure
router.post("/admin/create-clientandproject", createClientandProjectController);
router.get("/admin/get-clientandproject", getClientandProjectController);
router.get(
  "/admin/get-print-clientandproject/:id",
  getPrintClientandProjectController
);

router.put(
  "/admin/update-clientandproject/:id",
  updateClientandProjectController
);
router.delete(
  "/admin/delete-clientandproject/:id",
  deleteClientandProjectController
);

module.exports = router;
