const express = require("express");
const router = express.Router();
const isAuth = require("../middleware/auth");

//Import Controller
const {
  getCompanyIntroController,
  updateCompanyIntroController,
  deleteCompanyIntroController,
  createCompanyIntroController,
} = require("../controllers/companyIntroController");

//Route configure
router.post("/admin/create-companyintro", isAuth, createCompanyIntroController);
router.get("/admin/get-companyintro", isAuth, getCompanyIntroController);
router.put(
  "/admin/update-companyintro/:id",
  isAuth,
  updateCompanyIntroController
);
router.delete(
  "/admin/delete-companyintro/:id",
  isAuth,
  deleteCompanyIntroController
);

module.exports = router;
