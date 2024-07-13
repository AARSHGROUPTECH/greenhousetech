const productModel = require("../models/productModel");

// createProductController
const createProductController = async (req, res) => {
  try {
    const { productName } = req.body;

    const isExistProductName = await productModel.findOne({
      productName,
    });
    if (isExistProductName) {
      return res.status(404).send({
        success: false,
        message: "Product are already Exist",
      });
    }

    const user = await productModel.create({
      productName: productName,
    });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Invalid credential Product API",
      });
    }

    res.status(200).send({
      success: true,
      message: "Product created successfully API",
      user,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Product creation getting error API",
      error,
    });
  }
};

// getProductController
const getProductController = async (req, res) => {
  try {
    const data = await productModel.find({});

    if (!data) {
      return res.status(404).send({
        success: false,
        message: "Invalid credential Product API",
      });
    }

    res.status(200).send({
      success: true,
      message: "Product created successfully API",
      data,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Invalid credential Product API",
    });
  }
};

// updateProductController
const updateProductController = async (req, res) => {
  try {
    const { productName } = req.body;

    //Validation
    if (!productName) {
      return res.status(404).send({
        success: false,
        message: "Please Provide Product fields",
      });
    }

    //get Product data
    const ProductData = await productModel.findByIdAndUpdate(req.params.id);
    if (!ProductData) {
      return res.status(404).send({
        success: false,
        message: "Product update get error API",
      });
    }

    //Updateion
    if (productName) ProductData.productName = productName;

    // save File
    await ProductData.save();
    res.status(200).send({
      success: true,
      message: "Product data update Successfully API",
    });
  } catch (error) {
    // console.log("Product update getting error", error);
    res.status(500).send({
      success: false,
      message: "Product update getting error",
      error,
    });
  }
};

// deleteProductController
const deleteProductController = async (req, res) => {
  try {
    // get Product data

    // console.log("req.body._id", req.body._id);
    // console.log("req.body.id", req.body.id);
    const deleteProduct = await productModel.findByIdAndDelete({
      _id: req.params.id,
    });

    // console.log("deleteProduct", deleteProduct);

    if (!deleteProduct) {
      return res.status(400).send({
        success: false,
        message: "delete Product fields not found error API",
      });
    }

    // save File
    res.status(200).send({
      success: true,
      message: "Product fields delete Successfully API",
      deleteProduct,
    });
  } catch (error) {
    // console.log("Product fields delete getting error API", error);
    res.status(500).send({
      success: false,
      message: "Product fields delete getting error API",
      error,
    });
  }
};

//Exports controller
module.exports = {
  createProductController,
  getProductController,
  updateProductController,
  deleteProductController,
};
