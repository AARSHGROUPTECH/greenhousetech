const quotationRevisionModel = require("../models/quotationRevisionModel");

// createQuotationRevisionController
const createQuotationRevisionController = async (req, res) => {
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

    // createquotationRevision
    const createquotationRevision = await quotationRevisionModel.create({
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
      quotationId: req.params.id,
    });

    if (!createquotationRevision) {
      return res.status(404).send({
        success: false,
        message: "createquotationRevision Fields Create get error API",
      });
    }

    await createquotationRevision.save();
    // save File
    res.status(200).send({
      success: true,
      message: "createquotationRevision Created Successfully API",
      createquotationRevision,
    });
  } catch (error) {
    // console.log("createquotationRevision create getting error", error);
    res.status(500).send({
      success: false,
      message: "createquotationRevision create getting error",
    });
  }
};

// getQuotationRevisionController
const getQuotationRevisionController = async (req, res) => {
  try {
    const data = await quotationRevisionModel.find({});

    if (!data) {
      return res.status(404).send({
        success: false,
        message: "component data getting faild API",
      });
    }

    // console.log("createquotationRevision", data);
    return res.status(200).send({
      success: true,
      message: "getquotationRevision getting Successfully API",
      data,
    });
  } catch (error) {
    // console.log("createquotationRevision Data getting error", error);
    res.status(500).send({
      success: false,
      message: "GetquotationRevision Data getting error",
    });
  }
};

// updateQuotationRevisionController
const updateQuotationRevisionController = async (req, res) => {
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
      quotationId,
    } = req.body;

    //get Component data
    const updatequotationRevision = await quotationRevisionModel.findById(
      req.params.id
    );
    if (!updatequotationRevision) {
      return res.status(404).send({
        success: false,
        message: "updatequotationRevision update get error API",
      });
    }

    //Updateion
    if (orgnisationName)
      updatequotationRevision.orgnisationName = orgnisationName;
    if (orgnisationGSTN)
      updatequotationRevision.orgnisationGSTN = orgnisationGSTN;
    if (orgnisationAddress)
      updatequotationRevision.orgnisationAddress = orgnisationAddress;
    if (clientType) updatequotationRevision.clientType = clientType;
    if (quotationNumber)
      updatequotationRevision.quotationNumber = quotationNumber;
    if (quotationDate) updatequotationRevision.quotationDate = quotationDate;
    if (projectType) updatequotationRevision.projectType = projectType;
    if (unitType) updatequotationRevision.unitType = unitType;
    if (dimensionLength)
      updatequotationRevision.dimensionLength = dimensionLength;
    if (dimensionWidth) updatequotationRevision.dimensionWidth = dimensionWidth;
    if (dimensionDepth) updatequotationRevision.dimensionDepth = dimensionDepth;
    if (volumeLtr) updatequotationRevision.volumeLtr = volumeLtr;
    if (durationHr) updatequotationRevision.durationHr = durationHr;
    if (flowRate) updatequotationRevision.flowRate = flowRate;
    if (paymentTermsNo) updatequotationRevision.paymentTermsNo = paymentTermsNo;
    if (headerTemplateNo)
      updatequotationRevision.headerTemplateNo = headerTemplateNo;
    if (variantData) updatequotationRevision.variantData = variantData;
    if (quotationId) updatequotationRevision.quotationId = quotationId;

    // save File
    await updatequotationRevision.save();
    res.status(200).send({
      success: true,
      message: "updatequotationRevision data update Successfully API",
    });
  } catch (error) {
    // console.log("updatequotationRevision update getting error", error);
    res.status(500).send({
      success: false,
      message: "updatequotationRevision update getting error",
    });
  }
};

// deleteQuotationRevisionController
const deleteQuotationRevisionController = async (req, res) => {
  try {
    // get component data
    const deletequotationRevision =
      await quotationRevisionModel.findByIdAndDelete({
        _id: req.params.id,
      });

    // console.log("deletequotationRevision", deletequotationRevision);

    if (!deletequotationRevision) {
      return res.status(400).send({
        success: false,
        message: "delete quotationRevision fields not found error API",
      });
    }

    // save File
    res.status(200).send({
      success: true,
      message: "quotationRevision fields delete Successfully API",
      deletequotationRevision,
    });
  } catch (error) {
    // console.log("quotationRevision fields delete getting error API", error);
    res.status(500).send({
      success: false,
      message: "quotationRevision fields delete getting error API",
    });
  }
};

// getPrintQuotationRevisionController
const getPrintQuotationRevisionController = async (req, res) => {
  try {
    const data = await quotationRevisionModel.findById(req.params.id);

    if (!data) {
      return res.status(404).send({
        success: false,
        message: "QuotationRevision data getting faild API",
      });
    }

    // console.log("getQuotationRevision", data);
    return res.status(200).send({
      success: true,
      message: "QuotationRevision getting Successfully API",
      data,
    });
  } catch (error) {
    // console.log("QuotationRevision Data getting error", error);
    res.status(500).send({
      success: false,
      message: "QuotationRevision Data getting error",
      error,
    });
  }
};

//Exports controller
module.exports = {
  createQuotationRevisionController,
  getQuotationRevisionController,
  updateQuotationRevisionController,
  deleteQuotationRevisionController,
  getPrintQuotationRevisionController,
};
