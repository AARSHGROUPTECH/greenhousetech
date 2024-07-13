const fileSystem = require("file-system");
const fs = require("fs");

//file extend node fs origin methods, and overwrite some methods with next list chart
fileSystem.readFile === fs.readFile;

const organizationModel = require("../models/organizationModel");

// createOrganizationController
const createOrganizationController = async (req, res) => {
  try {
    const {
      businessType,
      organisationName,
      organisationAddress,
      taxResidency,
      financialYear,
      email,
      billingAddress,
      shippingAddress,
      gstNumber,
      websiteLink,
      bookingDate,
      contact,
    } = req.body;

    //Validation
    if (
      !businessType ||
      !organisationName ||
      !organisationAddress ||
      !taxResidency ||
      !financialYear ||
      !email ||
      !billingAddress ||
      !shippingAddress ||
      !gstNumber ||
      !websiteLink ||
      !bookingDate ||
      !contact
    ) {
      return res.status(404).send({
        success: false,
        message: "Please Provide all Organization fields",
      });
    }

    // createOrganization
    const createOrganization = await organizationModel.create({
      businessType,
      organisationName,
      organisationAddress,
      taxResidency,
      financialYear,
      email,
      billingAddress,
      shippingAddress,
      gstNumber,
      websiteLink,
      bookingDate,
      contact,
      organizationPick: req.files.organizationPick[0].path,
    });

    if (!createOrganization) {
      return res.status(404).send({
        success: false,
        message: "Organization Profile Create get error API",
      });
    }

    // save File
    await createOrganization.save();
    res.status(200).send({
      success: true,
      message: "Organization Profile Created Successfully API",
    });
  } catch (error) {
    // console.log("Organization create getting error", error);
    res.status(500).send({
      success: false,
      message: "Organization create getting error",
      error,
    });
  }
};

// getOrganizationController
const getOrganizationController = async (req, res) => {
  try {
    const data = await organizationModel.find({});
    // console.log("getOrganization", data);

    if (!data) {
      return res.status(404).send({
        success: false,
        message: "Organization data getting faild API",
      });
    }

    res.status(200).send({
      success: true,
      message: "Organization Profile getting Successfully API",
      data,
    });
  } catch (error) {
    // console.log("Organization Profile getting error", error);
    res.status(500).send({
      success: false,
      message: "Organization Profile getting error",
      error,
    });
  }
};

// updateOrganizationController
const updateOrganizationController = async (req, res) => {
  try {
    const {
      organisationName,
      organisationAddress,
      taxResidency,
      businessType,
      financialYear,
      email,
      billingAddress,
      shippingAddress,
      gstNumber,
      websiteLink,
      bookingDate,
      contact,
    } = req.body;

    // const organizationPick = req.files;
    // console.log("organizationPick.file", organizationPick);

    // console.log("req.params", req.params);

    // get Admin data
    const updateOrganization = await organizationModel.findByIdAndUpdate({
      _id: req.params.id,
    });
    // console.log("updateOrganization", updateOrganization);

    //Validation
    if (taxResidency) updateOrganization.taxResidency = taxResidency;
    if (businessType) updateOrganization.businessType = businessType;
    if (financialYear) updateOrganization.financialYear = financialYear;
    if (email) updateOrganization.email = email;
    if (billingAddress) updateOrganization.billingAddress = billingAddress;
    if (shippingAddress) updateOrganization.shippingAddress = shippingAddress;
    if (gstNumber) updateOrganization.gstNumber = gstNumber;
    if (websiteLink) updateOrganization.websiteLink = websiteLink;
    if (bookingDate) updateOrganization.bookingDate = bookingDate;
    if (contact) updateOrganization.contact = contact;
    if (organisationName)
      updateOrganization.organisationName = organisationName;
    if (organisationAddress)
      updateOrganization.organisationAddress = organisationAddress;

    //organizationPick
    if (updateOrganization.organizationPick) {
      fs.unlink("." + updateOrganization.organizationPick, (err) => {
        if (err) {
          // console.log(err);
        }
      });
    }

    if (
      Array.isArray(req.files.organizationPick) &&
      req.files.organizationPick.length > 0
    ) {
      await fs.promises.unlink(updateOrganization.organizationPick);
      updateOrganization.organizationPick = req.files.organizationPick[0].path;
    }

    if (!updateOrganization) {
      return res.status(404).send({
        success: false,
        message: "Organization Profile update get error API",
      });
    }

    // save File
    await updateOrganization.save();
    res.status(200).send({
      success: true,
      message: "Organization Profile update Successfully API",
    });
  } catch (error) {
    // console.log("Organization update getting error", error);
    res.status(500).send({
      success: false,
      message: "Organization update getting error",
      error,
    });
  }
};

// deleteOrganizationController
const deleteOrganizationController = async (req, res) => {
  try {
    // get Admin data
    const deleteOrganization = await organizationModel.findByIdAndDelete({
      _id: req.params.id,
    });

    // console.log("deleteOrganization", deleteOrganization);

    if (!deleteOrganization) {
      return res.status(400).send({
        success: false,
        message: "Organization Profile delete get not exist Id API",
      });
    }

    await fs.promises.unlink(deleteOrganization.organizationPick);

    // save File
    res.status(200).send({
      success: true,
      message: "Organization Profile delete Successfully API",
      deleteOrganization,
    });
  } catch (error) {
    // console.log("Organization Profile delete getting error API", error);
    res.status(500).send({
      success: false,
      message: "Organization Profile delete getting error API",
      error,
    });
  }
};

//Exports controller
module.exports = {
  createOrganizationController,
  getOrganizationController,
  updateOrganizationController,
  deleteOrganizationController,
};
