const clientandProjectModel = require("../models/clientandProjectModel");

// createClientandProjectController
const createClientandProjectController = async (req, res) => {
  try {
    const {
      orgnisationName,
      orgnisationGSTN,
      orgnisationAddress,
      clientType,
      quotationNumber,
      quotationDate,
      projectType,
      unitType,
      dimensionLength,
      dimensionWidth,
      dimensionDepth,
      volumeLtr,
      durationHr,
      flowRate,
      paymentTermsNo,
      headerTemplateNo,
      variantData,
    } = req.body;

    // createClientProject
    const createClientProject = await clientandProjectModel.create({
      orgnisationName,
      orgnisationGSTN,
      orgnisationAddress,
      clientType,
      quotationNumber,
      quotationDate,
      projectType,
      unitType,
      dimensionLength,
      dimensionWidth,
      dimensionDepth,
      volumeLtr,
      durationHr,
      flowRate,
      paymentTermsNo,
      headerTemplateNo,
      variantData,
    });

    if (!createClientProject) {
      return res.status(404).send({
        success: false,
        message: "createClientProject Fields Create get error API",
      });
    }

    await createClientProject.save();
    // save File
    res.status(200).send({
      success: true,
      message: "createClientProject Created Successfully API",
      createClientProject,
    });
  } catch (error) {
    // console.log("createClientProject create getting error", error);
    res.status(500).send({
      success: false,
      message: "createClientProject create getting error",
    });
  }
};

// getClientandProjectController
const getClientandProjectController = async (req, res) => {
  try {
    const data = await clientandProjectModel.find({});

    if (!data) {
      return res.status(404).send({
        success: false,
        message: "component data getting faild API",
      });
    }

    // console.log("createClientProject", data);
    return res.status(200).send({
      success: true,
      message: "createClientProject getting Successfully API",
      data,
    });
  } catch (error) {
    // console.log("createClientProject Data getting error", error);
    res.status(500).send({
      success: false,
      message: "createClientProject Data getting error",
    });
  }
};

// updateComponentController
const updateClientandProjectController = async (req, res) => {
  try {
    const {
      orgnisationName,
      orgnisationGSTN,
      orgnisationAddress,
      clientType,
      quotationNumber,
      quotationDate,
      projectType,
      unitType,
      dimensionLength,
      dimensionWidth,
      dimensionDepth,
      volumeLtr,
      durationHr,
      flowRate,
      paymentTermsNo,
      headerTemplateNo,
      variantData,
    } = req.body;

    //get Component data
    const updateClientProject = await clientandProjectModel.findById(
      req.params.id
    );
    if (!updateClientProject) {
      return res.status(404).send({
        success: false,
        message: "updateClientProject update get error API",
      });
    }

    //Updateion
    if (orgnisationName) updateClientProject.orgnisationName = orgnisationName;
    if (orgnisationGSTN) updateClientProject.orgnisationGSTN = orgnisationGSTN;
    if (orgnisationAddress)
      updateClientProject.orgnisationAddress = orgnisationAddress;
    if (clientType) updateClientProject.clientType = clientType;
    if (quotationNumber) updateClientProject.quotationNumber = quotationNumber;
    if (quotationDate) updateClientProject.quotationDate = quotationDate;
    if (projectType) updateClientProject.projectType = projectType;
    if (unitType) updateClientProject.unitType = unitType;
    if (dimensionLength) updateClientProject.dimensionLength = dimensionLength;
    if (dimensionWidth) updateClientProject.dimensionWidth = dimensionWidth;
    if (dimensionDepth) updateClientProject.dimensionDepth = dimensionDepth;
    if (volumeLtr) updateClientProject.volumeLtr = volumeLtr;
    if (durationHr) updateClientProject.durationHr = durationHr;
    if (flowRate) updateClientProject.flowRate = flowRate;
    if (paymentTermsNo) updateClientProject.paymentTermsNo = paymentTermsNo;
    if (headerTemplateNo)
      updateClientProject.headerTemplateNo = headerTemplateNo;
    if (variantData) updateClientProject.variantData = variantData;

    // save File
    await updateClientProject.save();
    res.status(200).send({
      success: true,
      message: "updateClientProject data update Successfully API",
    });
  } catch (error) {
    // console.log("updateClientProject update getting error", error);
    res.status(500).send({
      success: false,
      message: "updateClientProject update getting error",
    });
  }
};

// deleteComponentController
const deleteClientandProjectController = async (req, res) => {
  try {
    // get component data
    const deleteClientProject = await clientandProjectModel.findByIdAndDelete({
      _id: req.params.id,
    });

    // console.log("deleteClientProject", deleteClientProject);

    if (!deleteClientProject) {
      return res.status(400).send({
        success: false,
        message: "delete ClientProject fields not found error API",
      });
    }

    // save File
    res.status(200).send({
      success: true,
      message: "ClientProject fields delete Successfully API",
      deleteClientProject,
    });
  } catch (error) {
    // console.log("ClientProject fields delete getting error API", error);
    res.status(500).send({
      success: false,
      message: "ClientProject fields delete getting error API",
    });
  }
};

// getPrintClientandProjectController
const getPrintClientandProjectController = async (req, res) => {
  try {
    const data = await clientandProjectModel.findById(req.params.id);

    if (!data) {
      return res.status(404).send({
        success: false,
        message: "PrintClientandProject data getting faild API",
      });
    }

    // console.log("getPrintClientandProject", data);
    return res.status(200).send({
      success: true,
      message: "PrintClientandProject getting Successfully API",
      data,
    });
  } catch (error) {
    // console.log("PrintClientandProject Data getting error", error);
    res.status(500).send({
      success: false,
      message: "PrintClientandProject Data getting error",
      error,
    });
  }
};

//Exports controller
module.exports = {
  createClientandProjectController,
  getClientandProjectController,
  updateClientandProjectController,
  deleteClientandProjectController,
  getPrintClientandProjectController,
};
