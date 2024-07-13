const clientTypeModel = require("../models/clientTypeModel");

// createClientTypeController
const createClientTypeController = async (req, res) => {
  try {
    const { clientTypeBusiness } = req.body;

    // isExist validation
    const isExist = await clientTypeModel.findOne({ clientTypeBusiness });
    if (isExist) {
      return res.status(404).send({
        success: false,
        message: "Admin's clientTypeModel already Exist",
      });
    }

    const createClientType = await clientTypeModel.create({
      clientTypeBusiness: clientTypeBusiness,
    });

    if (!createClientType) {
      return res.status(404).send({
        success: false,
        message: "Invalid credential ClientType API",
      });
    }

    res.status(200).send({
      success: true,
      message: "ClientType created successfully API",
      createClientType,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "ClientType creation getting error API",
    });
  }
};

// getClientTypeController
const getClientTypeController = async (req, res) => {
  try {
    const data = await clientTypeModel.find({});
    if (!data) {
      return res.status(404).send({
        success: false,
        message: "Invalid credential ClientType API",
      });
    }

    res.status(200).send({
      success: true,
      message: "ClientType get successfully API",
      data,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Invalid credential ClientType API",
    });
  }
};

// updateClientTypeController
const updateClientTypeController = async (req, res) => {
  try {
    const { clientTypeBusiness } = req.body;

    //Validation
    if (!clientTypeBusiness) {
      return res.status(404).send({
        success: false,
        message: "Please Provide ClientType fields",
      });
    }

    //get ClientType data
    const ClientTypeData = await clientTypeModel.findById(req.params.id);
    if (!ClientTypeData) {
      return res.status(404).send({
        success: false,
        message: "ClientType update get error API",
      });
    }

    //Updateion
    if (clientTypeBusiness)
      ClientTypeData.clientTypeBusiness = clientTypeBusiness;

    // save File
    await ClientTypeData.save();
    res.status(200).send({
      success: true,
      message: "ClientType data update Successfully API",
    });
  } catch (error) {
    // console.log("ClientType update getting error", error);
    res.status(500).send({
      success: false,
      message: "ClientType update getting error",
    });
  }
};

// deleteClientTypeController
const deleteClientTypeController = async (req, res) => {
  try {
    // get ClientType data
    const deleteClientType = await clientTypeModel.findByIdAndDelete({
      _id: req.params.id,
    });

    // console.log("deleteClientType", deleteClientType);

    if (!deleteClientType) {
      return res.status(400).send({
        success: false,
        message: "delete ClientType fields not found error API",
      });
    }

    // save File
    res.status(200).send({
      success: true,
      message: "ClientType fields delete Successfully API",
      deleteClientType,
    });
  } catch (error) {
    // console.log("ClientType fields delete getting error API", error);
    res.status(500).send({
      success: false,
      message: "ClientType fields delete getting error API",
    });
  }
};

//Exports controller
module.exports = {
  createClientTypeController,
  getClientTypeController,
  updateClientTypeController,
  deleteClientTypeController,
};
