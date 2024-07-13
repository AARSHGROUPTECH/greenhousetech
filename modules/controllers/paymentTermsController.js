const paymentTermsModel = require("../models/paymentTermsModel");

// createPaymentTermsController
const createPaymentTermsController = async (req, res) => {
  try {
    const { paymentTermsType, paymentTermsMisc, paymentTermsGreetings } =
      req.body;

    //Validation
    if (!paymentTermsType || !paymentTermsMisc || !paymentTermsGreetings) {
      return res.status(404).send({
        success: false,
        message: "Please Provide all PaymentTerms fields API",
      });
    }

    // createPaymentTerms
    const createPaymentTerms = await paymentTermsModel.create({
      paymentTermsType,
      paymentTermsMisc,
      paymentTermsGreetings,
    });

    if (!createPaymentTerms) {
      return res.status(404).send({
        success: false,
        message: "PaymentTerms Fields Create get error API",
      });
    }

    await createPaymentTerms.save();
    // save File
    res.status(200).send({
      success: true,
      message: "PaymentTerms Created Successfully API",
      createPaymentTerms,
    });
  } catch (error) {
    // console.log("business create getting error", error);
    res.status(500).send({
      success: false,
      message: "PaymentTerms create getting error",
      error,
    });
  }
};

// getPaymentTermsController
const getPaymentTermsController = async (req, res) => {
  try {
    const data = await paymentTermsModel.find({});

    if (!data) {
      return res.status(404).send({
        success: false,
        message: "PaymentTerms data getting faild API",
      });
    }

    // console.log("getPaymentTerms", data);
    return res.status(200).send({
      success: true,
      message: "getPaymentTerms getting Successfully API",
      data,
    });
  } catch (error) {
    // console.log("getPaymentTerms Data getting error", error);
    res.status(500).send({
      success: false,
      message: "getPaymentTerms Data getting error",
      error,
    });
  }
};

// updatePaymentTermsController
const updatePaymentTermsController = async (req, res) => {
  try {
    const { paymentTermsType, paymentTermsMisc, paymentTermsGreetings } =
      req.body;

    //Validation
    if (!paymentTermsType || !paymentTermsMisc || !paymentTermsGreetings) {
      return res.status(404).send({
        success: false,
        message: "Please Provide PaymentTerms fields",
      });
    }

    //get PaymentTerms data
    const paymentTermsData = await paymentTermsModel.findById({
      _id: req.params.id,
    });

    if (!paymentTermsData) {
      return res.status(404).send({
        success: false,
        message: "PaymentTerms update get error API",
      });
    }

    //Updateion
    if (paymentTermsType) paymentTermsData.paymentTermsType = paymentTermsType;
    if (paymentTermsMisc) paymentTermsData.paymentTermsMisc = paymentTermsMisc;
    if (paymentTermsGreetings)
      paymentTermsData.paymentTermsGreetings = paymentTermsGreetings;

    // save File
    await paymentTermsData.save();
    res.status(200).send({
      success: true,
      message: "PaymentTerms data update Successfully API",
    });
  } catch (error) {
    // console.log("PaymentTerms update getting error", error);
    res.status(500).send({
      success: false,
      message: "PaymentTerms update getting error",
      error,
    });
  }
};

// deletePaymentTermsController
const deletePaymentTermsController = async (req, res) => {
  try {
    // get PaymentTerms data
    const deletePaymentTerms = await paymentTermsModel.findByIdAndDelete(
      req.params.id
    );

    // console.log("deletePaymentTerms", deletePaymentTerms);

    if (!deletePaymentTerms) {
      return res.status(400).send({
        success: false,
        message: "delete deletePaymentTerms fields not found error API",
      });
    }

    res.status(200).send({
      success: true,
      message: "PaymentTerms fields delete Successfully API",
      deletePaymentTerms,
    });
  } catch (error) {
    // console.log("PaymentTerms fields delete getting error API", error);
    res.status(500).send({
      success: false,
      message: "PaymentTerms fields delete getting error API",
      error,
    });
  }
};

//Exports controller
module.exports = {
  createPaymentTermsController,
  getPaymentTermsController,
  updatePaymentTermsController,
  deletePaymentTermsController,
};
