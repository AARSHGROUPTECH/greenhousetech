const cityModel = require("../models/cityModel");
//createCityController
const createCityController = async (req, res) => {
  try {
    const { city, state, status } = req.body;
    // isExist validation
    const isExist = await cityModel.findOne({ city });
    if (isExist) {
      return res.status(404).send({
        success: false,
        message: "Admin's City already Exist",
      });
    }

    // console.log("getState_city_create", getState);
    const getCity = await cityModel.create({
      city,
      state,
      status,
    });

    if (!getCity) {
      return res.status(404).send({
        success: false,
        message: "Invalid City API",
      });
    }

    res.status(200).send({
      success: true,
      message: "City created successfully API",
      getCity,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Invalid credential City API",
    });
  }
};

//getCityController
const getCityController = async (req, res) => {
  try {
    // here get city by stateId
    const data = await cityModel.find({});
    if (!data) {
      return res.status(404).send({
        success: false,
        message: "Invalid credential City API",
      });
    }

    res.status(200).send({
      success: true,
      message: "City created successfully API",
      data,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Invalid credential City API",
    });
  }
};

// updateCityController
const updateCityController = async (req, res) => {
  try {
    const { city, state, status } = req.body;

    //Validation
    if (!city) {
      return res.status(404).send({
        success: false,
        message: "Please Provide City fields",
      });
    }

    //get City data and update by city id
    const CityData = await cityModel.findById(req.params.id);
    if (!CityData) {
      return res.status(404).send({
        success: false,
        message: "City update get error API",
      });
    }

    //Updateion
    if (city) CityData.city = city;
    if (state) CityData.state = state;
    if (status) CityData.status = status;

    // save File
    await CityData.save();
    res.status(200).send({
      success: true,
      message: "City data update Successfully API",
    });
  } catch (error) {
    // console.log("City update getting error", error);
    res.status(500).send({
      success: false,
      message: "City update getting error",
      error,
    });
  }
};

// deleteCityController
const deleteCityController = async (req, res) => {
  const ids = req.body;

  try {
    // get City data
    const deleteCity = await cityModel.deleteMany({ _id: { $in: ids } });
    // console.log("deleteCity", deleteCity);

    if (!deleteCity) {
      return res.status(400).send({
        success: false,
        message: "delete City fields not found error API",
      });
    }

    // save File
    res.status(200).send({
      success: true,
      message: "City fields delete Successfully API",
      deleteCity,
    });
  } catch (error) {
    // console.log("City fields delete getting error API", error);
    res.status(500).send({
      success: false,
      message: "City fields delete getting error API",
      error,
    });
  }
};

//Exports controller
module.exports = {
  createCityController,
  getCityController,
  updateCityController,
  deleteCityController,
};
