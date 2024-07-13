const quotationTemplateModel = require("../models/quotationTemplateModel");
// createQuotationTemplateController
const createQuotationTemplateController = async (req, res) => {
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
      templateNo,
    } = req.body;

    // createQuotationTemplate
    const createQuotationTemplate = await quotationTemplateModel.create({
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
      templateNo,
    });

    if (!createQuotationTemplate) {
      return res.status(404).send({
        success: false,
        message: "createQuotationTemplate Fields Create get error API",
      });
    }

    await createQuotationTemplate.save();
    // save File
    res.status(200).send({
      success: true,
      message: "createQuotationTemplate Created Successfully API",
      createQuotationTemplate,
    });
  } catch (error) {
    // console.log("createQuotationTemplate create getting error", error);
    res.status(500).send({
      success: false,
      message: "createQuotationTemplate create getting error",
    });
  }
};

// getQuotationTemplateController
const getQuotationTemplateController = async (req, res) => {
  try {
    const data = await quotationTemplateModel.find({});

    if (!data) {
      return res.status(404).send({
        success: false,
        message: "component data getting faild API",
      });
    }

    // console.log("createQuotationTemplate", data);
    return res.status(200).send({
      success: true,
      message: "getQuotationTemplate getting Successfully API",
      data,
    });
  } catch (error) {
    // console.log("createQuotationTemplate Data getting error", error);
    res.status(500).send({
      success: false,
      message: "GetQuotationTemplate Data getting error",
    });
  }
};

// updateComponentController
const updateQuotationTemplateController = async (req, res) => {
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
      templateNo,
    } = req.body;

    //get Component data
    const updateQuotationTemplate = await quotationTemplateModel.findById(
      req.params.id
    );
    if (!updateQuotationTemplate) {
      return res.status(404).send({
        success: false,
        message: "updateQuotationTemplate update get error API",
      });
    }

    //Updateion
    if (orgnisationName)
      updateQuotationTemplate.orgnisationName = orgnisationName;
    if (orgnisationGSTN)
      updateQuotationTemplate.orgnisationGSTN = orgnisationGSTN;
    if (orgnisationAddress)
      updateQuotationTemplate.orgnisationAddress = orgnisationAddress;
    if (clientType) updateQuotationTemplate.clientType = clientType;
    if (quotationNumber)
      updateQuotationTemplate.quotationNumber = quotationNumber;
    if (quotationDate) updateQuotationTemplate.quotationDate = quotationDate;
    if (projectType) updateQuotationTemplate.projectType = projectType;
    if (unitType) updateQuotationTemplate.unitType = unitType;
    if (dimensionLength)
      updateQuotationTemplate.dimensionLength = dimensionLength;
    if (dimensionWidth) updateQuotationTemplate.dimensionWidth = dimensionWidth;
    if (dimensionDepth) updateQuotationTemplate.dimensionDepth = dimensionDepth;
    if (volumeLtr) updateQuotationTemplate.volumeLtr = volumeLtr;
    if (durationHr) updateQuotationTemplate.durationHr = durationHr;
    if (flowRate) updateQuotationTemplate.flowRate = flowRate;
    if (paymentTermsNo) updateQuotationTemplate.paymentTermsNo = paymentTermsNo;
    if (headerTemplateNo)
      updateQuotationTemplate.headerTemplateNo = headerTemplateNo;
    if (variantData) updateQuotationTemplate.variantData = variantData;
    if (templateNo) updateQuotationTemplate.templateNo = templateNo;

    // save File
    await updateQuotationTemplate.save();
    res.status(200).send({
      success: true,
      message: "updateQuotationTemplate data update Successfully API",
    });
  } catch (error) {
    // console.log("updateQuotationTemplate update getting error", error);
    res.status(500).send({
      success: false,
      message: "updateQuotationTemplate update getting error",
    });
  }
};

// deleteComponentController
const deleteQuotationTemplateController = async (req, res) => {
  try {
    // get component data
    const deleteQuotationTemplate =
      await quotationTemplateModel.findByIdAndDelete({
        _id: req.params.id,
      });

    // console.log("deleteQuotationTemplate", deleteQuotationTemplate);

    if (!deleteQuotationTemplate) {
      return res.status(400).send({
        success: false,
        message: "delete QuotationTemplate fields not found error API",
      });
    }

    // save File
    res.status(200).send({
      success: true,
      message: "QuotationTemplate fields delete Successfully API",
      deleteQuotationTemplate,
    });
  } catch (error) {
    // console.log("QuotationTemplate fields delete getting error API", error);
    res.status(500).send({
      success: false,
      message: "QuotationTemplate fields delete getting error API",
    });
  }
};

//Exports controller
module.exports = {
  createQuotationTemplateController,
  getQuotationTemplateController,
  updateQuotationTemplateController,
  deleteQuotationTemplateController,
};
