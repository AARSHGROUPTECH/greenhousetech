const express = require("express");
const router = express.Router();
// const isAuth = require("../middleware/auth");

//Import Controller
const {
  createQuotationRevisionController,
  getQuotationRevisionController,
  updateQuotationRevisionController,
  deleteQuotationRevisionController,
  getPrintQuotationRevisionController,
} = require("../controllers/quotationRevisionController");

//Route configure
router.post(
  "/admin/create-quotationrevision/:id",
  createQuotationRevisionController
);
router.get("/admin/get-quotationrevision", getQuotationRevisionController);
router.get(
  "/admin/get-print-quotationrevision/:id",
  getPrintQuotationRevisionController
);
router.put(
  "/admin/update-quotationrevision/:id",
  updateQuotationRevisionController
);
router.delete(
  "/admin/delete-quotationrevision/:id",
  deleteQuotationRevisionController
);

module.exports = router;
