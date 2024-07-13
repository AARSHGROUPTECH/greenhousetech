const express = require("express");
const router = express.Router();
const isAuth = require("../middleware/auth");

//Import Controller
const {
  createPaymentTermsController,
  getPaymentTermsController,
  updatePaymentTermsController,
  deletePaymentTermsController,
} = require("../controllers/paymentTermsController");

//Route configure
router.post("/admin/create-paymentterms", createPaymentTermsController);
router.get("/admin/get-paymentterms", getPaymentTermsController);
router.put(
  "/admin/update-paymentterms/:id",

  updatePaymentTermsController
);
router.delete(
  "/admin/delete-paymentterms/:id",

  deletePaymentTermsController
);

module.exports = router;
