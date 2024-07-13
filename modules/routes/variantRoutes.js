const express = require("express");
const router = express.Router();
const isAuth = require("../middleware/auth");

//Import Controller
const {
  getVariantController,
  deleteVariantController,
  updateVariantController,
  createVariantController,
} = require("../controllers/variantController");
const uploads = require("../fileUploads/uploads");

//Route configure
router.post("/admin/create-variant/:id", uploads, createVariantController);
router.get("/admin/get-variant", getVariantController);
router.put(
  "/admin/update-variant/:id",

  uploads,
  updateVariantController
);
router.delete("/admin/delete-variant/:id", deleteVariantController);

module.exports = router;
