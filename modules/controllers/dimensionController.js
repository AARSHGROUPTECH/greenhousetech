const dimensionModel = require("../models/dimensionModel");
// createDimensionController
const createDimensionController = async (req, res) => {
  try {
    const { dimensionName } = req.body;

    // isExist validation
    const isExist = await dimensionModel.findOne({ dimensionName });
    if (isExist) {
      return res.status(404).send({
        success: false,
        message: "Admin's Dimension already Exist",
      });
    }

    //Validation
    if (!dimensionName) {
      return res.status(404).send({
        success: false,
        message: "Please Provide all Dimension fields",
      });
    }

    // createDimension
    const createDimension = await dimensionModel.create({
      dimensionName,
    });

    if (!createDimension) {
      return res.status(404).send({
        success: false,
        message: "Dimension Fields Create get error API",
      });
    }
    await createDimension.save();

    // save File
    res.status(200).send({
      success: true,
      message: "Dimension Created Successfully API",
      createDimension,
    });
  } catch (error) {
    // console.log("Dimension create getting error", error);
    res.status(500).send({
      success: false,
      message: "Dimension create getting error",
      error,
    });
  }
};

// getDimensionController
const getDimensionController = async (req, res) => {
  try {
    const data = await dimensionModel.find({});

    if (!data) {
      return res.status(404).send({
        success: false,
        message: "Dimension data getting faild API",
      });
    }

    // console.log("getDimension", data);
    return res.status(200).send({
      success: true,
      message: "getDimension getting Successfully API",
      data,
    });
  } catch (error) {
    // console.log("getDimension Data getting error", error);
    res.status(500).send({
      success: false,
      message: "getDimension Data getting error",
      error,
    });
  }
};

// updateDimensionController
const updateDimensionController = async (req, res) => {
  try {
    const { dimensionName } = req.body;

    //Validation
    if (!dimensionName) {
      return res.status(404).send({
        success: false,
        message: "Please Provide Dimension fields",
      });
    }

    //get dimension data
    const dimensionData = await dimensionModel.findById(req.params.id);
    if (!dimensionData) {
      return res.status(404).send({
        success: false,
        message: "Dimension update get error API",
      });
    }

    //Updateion
    if (dimensionName) dimensionData.dimensionName = dimensionName;

    // save File
    await dimensionData.save();
    res.status(200).send({
      success: true,
      message: "Dimension data update Successfully API",
    });
  } catch (error) {
    // console.log("Dimension update getting error", error);
    res.status(500).send({
      success: false,
      message: "Dimension update getting error",
      error,
    });
  }
};

// deleteDimensionController
const deleteDimensionController = async (req, res) => {
  try {
    // get dimension data
    const deleteDimension = await dimensionModel.findByIdAndDelete({
      _id: req.params.id,
    });

    // console.log("deleteDimension", deleteDimension);

    if (!deleteDimension) {
      return res.status(400).send({
        success: false,
        message: "delete dimension fields not found error API",
      });
    }

    // save File
    res.status(200).send({
      success: true,
      message: "dimension fields delete Successfully API",
      deleteDimension,
    });
  } catch (error) {
    // console.log("dimension fields delete getting error API", error);
    res.status(500).send({
      success: false,
      message: "dimension fields delete getting error API",
      error,
    });
  }
};

//Exports controller
module.exports = {
  createDimensionController,
  getDimensionController,
  updateDimensionController,
  deleteDimensionController,
};
