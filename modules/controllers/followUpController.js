const followUpModel = require("../models/followUpModel");

// createFollowUpController
const createFollowUpController = async (req, res) => {
  try {
    const { followupDatetime, followupSummary, followedBy } = req.body;
    const data = await followUpModel.create({
      quotationReviseId: req.params.id,
      followupDatetime: followupDatetime,
      followupSummary: followupSummary,
      followedBy: followedBy,
    });

    if (!data) {
      return res.status(404).send({
        success: false,
        message: "Invalid credential FollowUp API",
      });
    }

    res.status(200).send({
      success: true,
      message: "FollowUp created successfully API",
      data,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "FollowUp creation getting error API",
      error,
    });
  }
};

// getFollowUpController
const getFollowUpController = async (req, res) => {
  try {
    const data = await followUpModel.find({
      quotationReviseId: req.params.id,
    });

    if (!data) {
      return res.status(404).send({
        success: false,
        message: "Invalid credential FollowUp API",
      });
    }

    res.status(200).send({
      success: true,
      message: "FollowUp created successfully API",
      data,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Invalid credential FollowUp API",
    });
  }
};

// updateFollowUpController
const updateFollowUpController = async (req, res) => {
  try {
    const { followupDatetime, followupSummary, followedBy } = req.body;

    //Validation
    if (!followupDatetime || !followupSummary || !followedBy) {
      return res.status(404).send({
        success: false,
        message: "Please Provide FollowUp fields",
      });
    }

    //get Product data
    const Followupdata = await followUpModel.findByIdAndUpdate(req.params.id);
    if (!Followupdata) {
      return res.status(404).send({
        success: false,
        message: "Product update get error API",
      });
    }

    //Updateion
    if (followupDatetime) Followupdata.followupDatetime = followupDatetime;
    if (followupSummary) Followupdata.followupSummary = followupSummary;
    if (followedBy) Followupdata.followedBy = followedBy;

    // save File
    await Followupdata.save();
    res.status(200).send({
      success: true,
      message: "followup data update Successfully API",
    });
  } catch (error) {
    // console.log("Product update getting error", error);
    res.status(500).send({
      success: false,
      message: "followup update getting error",
      error,
    });
  }
};

// deleteFollowUpController
const deleteFollowUpController = async (req, res) => {
  try {
    const deleteProduct = await followUpModel.findByIdAndDelete({
      _id: req.params.id,
    });

    if (!deleteProduct) {
      return res.status(400).send({
        success: false,
        message: "delete followup fields not found error API",
      });
    }

    // save File
    res.status(200).send({
      success: true,
      message: "followup fields delete Successfully API",
      deleteProduct,
    });
  } catch (error) {
    // console.log("Product fields delete getting error API", error);
    res.status(500).send({
      success: false,
      message: "followup fields delete getting error API",
      error,
    });
  }
};

//Exports controller
module.exports = {
  createFollowUpController,
  getFollowUpController,
  updateFollowUpController,
  deleteFollowUpController,
};
