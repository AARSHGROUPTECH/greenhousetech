const clientModel = require("../models/clientModel");

// createClientController
const createClientController = async (req, res) => {
  try {
    const {
      businessName,
      contactPersonName,
      mobile,
      email,
      gstNumber,
      websiteLink,
      referenceName,
      billingAddress,
      shippingAddress,
      pinCode,
      businessType,
      state,
      city,
    } = req.body;

    //Validation
    if (
      !businessName ||
      !contactPersonName ||
      !mobile ||
      !email ||
      !gstNumber ||
      !websiteLink ||
      !referenceName ||
      !billingAddress ||
      !shippingAddress ||
      !pinCode ||
      !businessType ||
      !state ||
      !city
    ) {
      return res.status(404).send({
        success: false,
        message: "Please Provide all Client fields",
      });
    }

    // createClient
    const createClient = await clientModel.create({
      businessName,
      businessType,
      contactPersonName,
      mobile,
      email,
      gstNumber,
      websiteLink,
      referenceName,
      state,
      city,
      billingAddress,
      shippingAddress,
      pinCode,
    });

    if (!createClient) {
      return res.status(404).send({
        success: false,
        message: "Client Fields Create get error API",
      });
    }

    // console.log("createClient", createClient);

    // save File
    await createClient.save();
    res.status(200).send({
      success: true,
      message: "Client Created Successfully API",
      createClient,
    });
  } catch (error) {
    // console.log("Client create getting error", error);
    res.status(500).send({
      success: false,
      message: "Client create getting error",
      error,
    });
  }
};

// getClientController
const getClientController = async (req, res) => {
  try {
    const data = await clientModel.find({});

    if (!data) {
      return res.status(404).send({
        success: false,
        message: "Client data getting faild API",
      });
    }

    // console.log("getClient", data);
    return res.status(200).send({
      success: true,
      message: "Client getting Successfully API",
      data,
    });
  } catch (error) {
    // console.log("Client Data getting error", error);
    res.status(500).send({
      success: false,
      message: "Client Data getting error",
      error,
    });
  }
};

// updateClientController
const updateClientController = async (req, res) => {
  try {
    const {
      businessName,
      contactPersonName,
      mobile,
      email,
      gstNumber,
      websiteLink,
      referenceName,
      billingAddress,
      shippingAddress,
      pinCode,
      businessType,
      state,
      city,
    } = req.body;

    //Validation
    if (
      !businessName ||
      !contactPersonName ||
      !mobile ||
      !email ||
      !gstNumber ||
      !websiteLink ||
      !referenceName ||
      !billingAddress ||
      !shippingAddress ||
      !pinCode ||
      !businessType ||
      !state ||
      !city
    ) {
      return res.status(404).send({
        success: false,
        message: "Please Provide all Client fields",
      });
    }

    // get clientData and update by client id
    const clientData = await clientModel.findById(req.params.id);
    if (!clientData) {
      return res.status(404).send({
        success: false,
        message: "Client update get error API",
      });
    }

    //Updateion
    if (businessName) clientData.businessName = businessName;
    if (contactPersonName) clientData.contactPersonName = contactPersonName;
    if (mobile) clientData.mobile = mobile;
    if (email) clientData.email = email;
    if (gstNumber) clientData.gstNumber = gstNumber;
    if (websiteLink) clientData.websiteLink = websiteLink;
    if (referenceName) clientData.referenceName = referenceName;
    if (billingAddress) clientData.billingAddress = billingAddress;
    if (shippingAddress) clientData.shippingAddress = shippingAddress;
    if (pinCode) clientData.pinCode = pinCode;
    if (businessType) clientData.businessType = businessType;
    if (state) clientData.state = state;
    if (city) clientData.city = city;

    // save File
    await clientData.save();
    res.status(200).send({
      success: true,
      message: "Client data update Successfully API",
      clientData,
    });
  } catch (error) {
    // console.log("Client update getting error", error);
    res.status(500).send({
      success: false,
      message: "Client update getting error",
      error,
    });
  }
};

// deleteClientController
const deleteClientController = async (req, res) => {
  try {
    // get Client data
    const delteClient = await clientModel.findByIdAndDelete({
      _id: req.params.id,
    });

    // console.log("delteClient", delteClient);

    if (!delteClient) {
      return res.status(400).send({
        success: false,
        message: "Client delete get error API",
      });
    }

    // save File
    res.status(200).send({
      success: true,
      message: "Client data delete Successfully API",
      delteClient,
    });
  } catch (error) {
    // console.log("Client data delete getting error API", error);
    res.status(500).send({
      success: false,
      message: "Client data delete getting error API",
      error,
    });
  }
};

//Exports controller
module.exports = {
  createClientController,
  getClientController,
  updateClientController,
  deleteClientController,
};
