const businessTypeModel = require("../models/businessTypeModel");
// createBusinessTypeController
const createBusinessTypeController = async (req, res) => {
  try {
    const { businessName, status } = req.body;

    //Validation
    if (!businessName) {
      return res.status(404).send({
        success: false,
        message: "Please Provide all businessName fields",
      });
    }

    // createBusinessType
    const createBusinessType = await businessTypeModel.create({
      businessName,
      status,
    });

    if (!createBusinessType) {
      return res.status(404).send({
        success: false,
        message: "businessType Fields Create get error API",
      });
    }
    await createBusinessType.save();

    // save File
    res.status(200).send({
      success: true,
      message: "businessType Created Successfully API",
      createBusinessType,
    });
  } catch (error) {
    // console.log("business create getting error", error);
    res.status(500).send({
      success: false,
      message: "businessType create getting error",
      error,
    });
  }
};

// getBusinessTypeController
const getBusinessTypeController = async (req, res) => {
  try {
    const data = await businessTypeModel.find({});

    if (!data) {
      return res.status(404).send({
        success: false,
        message: "businessType data getting faild API",
      });
    }

    // console.log("getBusiness", data);
    return res.status(200).send({
      success: true,
      message: "getBusiness getting Successfully API",
      data,
    });
  } catch (error) {
    // console.log("getBusiness Data getting error", error);
    res.status(500).send({
      success: false,
      message: "getBusiness Data getting error",
      error,
    });
  }
};

// updateBusinessTypeController
const updateBusinessTypeController = async (req, res) => {
  try {
    const { businessName, status } = req.body;

    //Validation
    if (!businessName) {
      return res.status(404).send({
        success: false,
        message: "Please Provide businessName fields",
      });
    }

    //get businessName data
    const businessTypeData = await businessTypeModel.findById(req.params.id);
    if (!businessTypeData) {
      return res.status(404).send({
        success: false,
        message: "businessName update get error API",
      });
    }

    //Updateion
    if (businessName) businessTypeData.businessName = businessName;
    if (status) businessTypeData.status = status;

    // save File
    await businessTypeData.save();
    res.status(200).send({
      success: true,
      message: "businessName data update Successfully API",
    });
  } catch (error) {
    // console.log("businessName update getting error", error);
    res.status(500).send({
      success: false,
      message: "businessName update getting error",
      error,
    });
  }
};

// deleteBusinessTypeController
const deleteBusinessTypeController = async (req, res) => {
  try {
    // get businessType data
    const deleteBusinessType = await businessTypeModel.findByIdAndDelete({
      _id: req.params.id,
    });

    // console.log("deleteBusinessType", deleteBusinessType);

    if (!deleteBusinessType) {
      return res.status(400).send({
        success: false,
        message: "delete StabusinessType fields not found error API",
      });
    }

    // save File
    res.status(200).send({
      success: true,
      message: "businessType fields delete Successfully API",
      deleteBusinessType,
    });
  } catch (error) {
    // console.log("businessType fields delete getting error API", error);
    res.status(500).send({
      success: false,
      message: "businessType fields delete getting error API",
      error,
    });
  }
};

//Exports controller
module.exports = {
  createBusinessTypeController,
  getBusinessTypeController,
  updateBusinessTypeController,
  deleteBusinessTypeController,
};
