const fileSystem = require("file-system");
const fs = require("fs");
fileSystem.readFile === fs.readFile;
const variantModel = require("../models/variantModel");
const componentModel = require("../models/componentModel");

// createVariantController
const createVariantController = async (req, res) => {
  try {
    const { variantName, unitPrice, inputFields, attribute } = req.body;

    // Validation;
    if (!variantName || !unitPrice || !attribute || !inputFields) {
      return res.status(404).send({
        success: false,
        message: "Please Provide all variant fields API",
      });
    }

    // Validation
    // const isExistVariant = await variantModel.findOne({
    //   variantName,
    // });
    // if (isExistVariant) {
    //   return res.status(404).send({
    //     success: false,
    //     message: "Variant are already Exist",
    //   });
    // }

    // console.log("req.files", req.files);
    const component = await componentModel.findOne({ _id: req.params.id });
    // let datas = [];
    // component.filter((item) => {
    //   if ((item._id = req.params.id)) {
    //     return (datas = item);
    //   }
    // });

    // createvariant
    const createvariant = await variantModel.create({
      variantName: variantName,
      unitPrice: unitPrice,
      attribute: attribute,
      inputFields: inputFields,
      variantFile: req.files.variantFile[0].path,
      componentId: req.params.id,
      component: component,
    });

    if (!createvariant) {
      return res.status(404).send({
        success: false,
        message: "variant Fields Create get error API",
      });
    }

    // save File
    await createvariant.save();
    res.status(200).send({
      success: true,
      message: "variant Created Successfully API",
      createvariant,
    });
  } catch (error) {
    // console.log("business create getting error", error);
    res.status(500).send({
      success: false,
      message: "variant create getting error",
    });
  }
};

// getVariantController
const getVariantController = async (req, res) => {
  try {
    // this is the Component Id
    let data = await variantModel.find({});

    if (!data) {
      return res.status(404).send({
        success: false,
        message: "variant data getting faild API",
      });
    }

    // console.log("getVariant", data);
    return res.status(200).send({
      success: true,
      message: "getVariant getting Successfully API",
      data,
    });
  } catch (error) {
    // console.log("getVariant Data getting error", error);
    res.status(500).send({
      success: false,
      message: "getVariant Data getting error",
    });
  }
};

// updateVariantController
const updateVariantController = async (req, res) => {
  try {
    const { variantName, unitPrice, inputFields, attribute } = req.body;

    //get variant data
    const variantData = await variantModel.findById(req.params.id);
    if (!variantData) {
      return res.status(404).send({
        success: false,
        message: "variant update get error API",
      });
    }

    //Updateion
    if (variantName) variantData.variantName = variantName;
    if (unitPrice) variantData.unitPrice = unitPrice;
    if (attribute) variantData.attribute = attribute;
    if (inputFields) variantData.inputFields = inputFields;

    //variantFile
    if (variantData.variantFile) {
      fs.unlink("." + variantData.variantFile, (err) => {
        if (err) {
          // console.log(err);
        }
      });
    }

    if (
      Array.isArray(req.files.variantFile) &&
      req.files.variantFile.length > 0
    ) {
      await fs.promises.unlink(variantData.variantFile);
      variantData.variantFile = req.files.variantFile[0].path;
    }

    if (!variantData) {
      return res.status(404).send({
        success: false,
        message: "Admin Profile update get error API",
      });
    }

    // save File
    await variantData.save();
    res.status(200).send({
      success: true,
      message: "variant data update Successfully API",
    });
  } catch (error) {
    // console.log("variant update getting error", error);
    res.status(500).send({
      success: false,
      message: "variant update getting error",
    });
  }
};

// deleteVariantController
const deleteVariantController = async (req, res) => {
  try {
    // get variant data
    const deleteVariant = await variantModel.findByIdAndDelete({
      _id: req.params.id,
    });

    // console.log("deleteVariant", deleteVariant);

    if (!deleteVariant) {
      return res.status(400).send({
        success: false,
        message: "delete deleteVariant fields not found error API",
      });
    }

    // save File
    res.status(200).send({
      success: true,
      message: "variant fields delete Successfully API",
      deleteVariant,
    });
  } catch (error) {
    // console.log("variant fields delete getting error API", error);
    res.status(500).send({
      success: false,
      message: "variant fields delete getting error API",
    });
  }
};

//Exports controller
module.exports = {
  createVariantController,
  getVariantController,
  updateVariantController,
  deleteVariantController,
};
