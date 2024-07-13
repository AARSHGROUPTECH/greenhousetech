const stateModel = require("../models/stateModel");
// createStateController
const createStateController = async (req, res) => {
  try {
    const { state, status } = req.body;
    console.log("state,", state);
    console.log("status,", status);

    // isExist validation
    const isExist = await stateModel.findOne({ state });
    if (isExist) {
      return res.status(404).send({
        success: false,
        message: "Admin's State already Exist",
      });
    }

    const getState = await stateModel.create({
      state,
      status,
    });

    if (!getState) {
      return res.status(404).send({
        success: false,
        message: "Invalid credential State API",
      });
    }

    res.status(200).send({
      success: true,
      message: "State created successfully API",
      getState,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Invalid credential State API",
    });
  }
};

// getStateController
const getStateController = async (req, res) => {
  try {
    const data = await stateModel.find({});

    if (!data) {
      return res.status(404).send({
        success: false,
        message: "Invalid credential State API",
      });
    }

    res.status(200).send({
      success: true,
      message: "State created successfully API",
      data,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Invalid credential State API",
    });
  }
};

// updateStateController
const updateStateController = async (req, res) => {
  try {
    const { state, status } = req.body;

    //get State data
    const stateData = await stateModel.findById(req.params.id);
    if (!stateData) {
      return res.status(404).send({
        success: false,
        message: "State update get error API",
      });
    }

    //Updateion
    if (state) stateData.state = state;
    if (status) stateData.status = status;

    // save File
    await stateData.save();
    res.status(200).send({
      success: true,
      message: "State data update Successfully API",
    });
  } catch (error) {
    // console.log("State update getting error", error);
    res.status(500).send({
      success: false,
      message: "State update getting error",
    });
  }
};

// deleteStateController
const deleteStateController = async (req, res) => {
  const ids = req.body;
  try {
    const deleteState = await stateModel.deleteMany({ _id: { $in: ids } });
    if (!deleteState) {
      return res.status(400).send({
        success: false,
        message: "delete State fields not found error API",
      });
    }

    // save File
    res.status(200).send({
      success: true,
      message: "State fields delete Successfully API",
      deleteState,
    });
  } catch (error) {
    // console.log("State fields delete getting error API", error);
    res.status(500).send({
      success: false,
      message: "State fields delete getting error API",
    });
  }
};

const updateStateStatus = async (req, res) => {
  try {
    const { state, status } = req.body;

    const stateData = await stateModel.findById(req.params.id);
    if (!stateData) {
      return res.status(404).send({
        success: false,
        message: "State Status update get error API",
      });
    }

    //Updateion
    if (state) stateData.state = state;
    if (status) stateData.status = status;

    // save File
    await stateData.save();
    res.status(200).send({
      success: true,
      message: "State Status data update Successfully API",
    });
  } catch (error) {
    // console.log("State update getting error", error);
    res.status(500).send({
      success: false,
      message: "State Status update getting error",
    });
  }
};

//Exports controller
module.exports = {
  createStateController,
  getStateController,
  updateStateController,
  deleteStateController,
  updateStateStatus,
};
