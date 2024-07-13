const express = require("express");
const router = express.Router();

//Import Controller
const {
  getCityController,
  createCityController,
  updateCityController,
  deleteCityController,
} = require("../controllers/cityController");
//Route configure

//Routes
router.post("/admin/create-city", createCityController);
router.get("/admin/get-city", getCityController);
router.put("/admin/update-city/:id", updateCityController);
router.post("/admin/delete-city", deleteCityController);

module.exports = router;
