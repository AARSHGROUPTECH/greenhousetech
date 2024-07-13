const express = require("express");
const router = express.Router();

//Import Controller
const {
  createDimensionController,
  getDimensionController,
  updateDimensionController,
  deleteDimensionController,
} = require("../controllers/dimensionController");
//Route configure

//Routes
router.post("/admin/create-dimension", createDimensionController);
router.get("/admin/get-dimension", getDimensionController);
router.put("/admin/update-dimension/:id", updateDimensionController);
router.delete("/admin/delete-dimension/:id", deleteDimensionController);

module.exports = router;
