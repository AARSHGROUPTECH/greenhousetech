const express = require("express");
const router = express.Router();
const isAuth = require("../middleware/auth");

//Import Controller
const {
  getProductController,
  createProductController,
  updateProductController,
  deleteProductController,
} = require("../controllers/productController");
//Route configure

//Routes
router.post("/admin/create-product", createProductController);
router.get("/admin/get-product", getProductController);
router.put("/admin/update-product/:id", updateProductController);
router.delete("/admin/delete-product/:id", deleteProductController);

module.exports = router;
