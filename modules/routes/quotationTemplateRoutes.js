const express = require("express");
const router = express.Router();
// const isAuth = require("../middleware/auth");

//Import Controller
const {
  createQuotationTemplateController,
  getQuotationTemplateController,
  updateQuotationTemplateController,
  deleteQuotationTemplateController,
} = require("../controllers/quotationTemplateController");

//Route configure
router.post(
  "/admin/create-quotationtemplate",
  createQuotationTemplateController
);
router.get("/admin/get-quotationtemplate", getQuotationTemplateController);

router.put(
  "/admin/update-quotationtemplate/:id",
  updateQuotationTemplateController
);
router.delete(
  "/admin/delete-quotationtemplate/:id",
  deleteQuotationTemplateController
);

module.exports = router;
