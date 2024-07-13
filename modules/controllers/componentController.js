const componentModel = require("../models/componentModel");
const variantModel = require("../models/variantModel");
// createComponentController
const createComponentController = async (req, res) => {
  try {
    const { componentProductName, componentName, inputFields, attribute } =
      req.body;

    // product arent' available from body.
    const isExistComponentProduct = await componentModel.findOne({
      componentProductName,
    });
    if (isExistComponentProduct) {
      return res.status(404).send({
        success: false,
        message: "Product are already Exist",
      });
    }

    //Validation
    if (!componentProductName || !componentName || !attribute || !inputFields) {
      return res.status(404).send({
        success: false,
        message: "Please Provide all component fields API",
      });
    }

    const variantData = await variantModel.find({});

    // createcomponent
    const createcomponent = await componentModel.create({
      componentProductName,
      componentName,
      inputFields,
      attribute,
      componentVariant: variantData,
    });

    if (!createcomponent) {
      return res.status(404).send({
        success: false,
        message: "component Fields Create get error API",
      });
    }

    await createcomponent.save();
    // save File
    res.status(200).send({
      success: true,
      message: "component Created Successfully API",
      createcomponent,
    });
  } catch (error) {
    // console.log("business create getting error", error);
    res.status(500).send({
      success: false,
      message: "component create getting error",
      error,
    });
  }
};

// getComponentController
const getComponentController = async (req, res) => {
  try {
    const data = await componentModel.find({});

    if (!data) {
      return res.status(404).send({
        success: false,
        message: "component data getting faild API",
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

// updateComponentController
const updateComponentController = async (req, res) => {
  try {
    const { componentProductName, componentName, inputFields, attribute } =
      req.body;

    //get Component data
    const componentData = await componentModel.findById(req.params.id);
    if (!componentData) {
      return res.status(404).send({
        success: false,
        message: "Component update get error API",
      });
    }

    //Updateion
    if (componentProductName)
      componentData.componentProductName = componentProductName;
    if (componentName) componentData.componentName = componentName;
    if (attribute) componentData.attribute = attribute;
    if (inputFields) componentData.inputFields = inputFields;

    // save File
    await componentData.save();
    res.status(200).send({
      success: true,
      message: "Component data update Successfully API",
    });
  } catch (error) {
    // console.log("Component update getting error", error);
    res.status(500).send({
      success: false,
      message: "Component update getting error",
      error,
    });
  }
};

// deleteComponentController
const deleteComponentController = async (req, res) => {
  try {
    // get component data
    const deleteComponent = await componentModel.findByIdAndDelete({
      _id: req.params.id,
    });

    // console.log("deleteComponent", deleteComponent);

    if (!deleteComponent) {
      return res.status(400).send({
        success: false,
        message: "delete deleteComponent fields not found error API",
      });
    }

    // save File
    res.status(200).send({
      success: true,
      message: "component fields delete Successfully API",
      deleteComponent,
    });
  } catch (error) {
    // console.log("component fields delete getting error API", error);
    res.status(500).send({
      success: false,
      message: "component fields delete getting error API",
      error,
    });
  }
};

//Exports controller
module.exports = {
  createComponentController,
  getComponentController,
  updateComponentController,
  deleteComponentController,
};
