const fileSystem = require("file-system");
const fs = require("fs");

//file extend node fs origin methods, and overwrite some methods with next list chart
fileSystem.readFile === fs.readFile;

const organisationHeaderTemplateModel = require("../models/organisationHeaderTemplateModel");

// createOrganisationHeaderTemplateController
const createOrganisationHeaderTemplateController = async (req, res) => {
  try {
    const {
      organisationHeader,
      organisationFooter,
      organisationGreetings,
      organisationMsmeReg,
    } = req.body;

    //Validation
    if (
      !organisationHeader ||
      !organisationFooter ||
      !organisationGreetings ||
      !organisationMsmeReg
    ) {
      return res.status(404).send({
        success: false,
        message: "Please Provide all OrganisationHeaderTemplate fields",
      });
    }

    // createOrganization
    const createOrganisationHeaderTemplate =
      await organisationHeaderTemplateModel.create({
        organisationMsmeReg,
        organisationHeader,
        organisationFooter,
        organisationGreetings,
        organizationLogo: req.files.organizationLogo[0].path,
        orgCertificateLogo: req.files.orgCertificateLogo[0].path,
      });

    if (!createOrganisationHeaderTemplate) {
      return res.status(404).send({
        success: false,
        message: "OrganisationHeaderTemplate Create get error API",
      });
    }

    // save File
    await createOrganisationHeaderTemplate.save();
    res.status(200).send({
      success: true,
      message: "OrganisationHeaderTemplate Created Successfully API",
    });
  } catch (error) {
    // console.log("OrganisationHeaderTemplate create getting error", error);
    res.status(500).send({
      success: false,
      message: "Organization create getting error",
      error,
    });
  }
};

// getOrganisationHeaderTemplateController
const getOrganisationHeaderTemplateController = async (req, res) => {
  try {
    const data = await organisationHeaderTemplateModel.find({});
    // console.log("OrganisationHeaderTemplate", data);

    if (!data) {
      return res.status(404).send({
        success: false,
        message: "OrganisationHeaderTemplate data getting faild API",
      });
    }

    res.status(200).send({
      success: true,
      message: "OrganisationHeaderTemplate getting Successfully API",
      data,
    });
  } catch (error) {
    // console.log("OrganisationHeaderTemplate getting error", error);
    res.status(500).send({
      success: false,
      message: "OrganisationHeaderTemplate getting error",
      error,
    });
  }
};

// updateOrganisationHeaderTemplateController
const updateOrganisationHeaderTemplateController = async (req, res) => {
  try {
    const {
      organisationHeader,
      organisationFooter,
      organisationGreetings,
      organisationMsmeReg,
    } = req.body;

    // get Admin data
    const UpdateOrganisationHeaderTemplate =
      await organisationHeaderTemplateModel.findByIdAndUpdate({
        _id: req.params.id,
      });
      
   console.log("OrganisationHeaderTemplate", UpdateOrganisationHeaderTemplate);

    if (organisationMsmeReg)
      UpdateOrganisationHeaderTemplate.organisationMsmeReg =
        organisationMsmeReg;
    if (organisationHeader)
      UpdateOrganisationHeaderTemplate.organisationHeader = organisationHeader;
    if (organisationFooter)
      UpdateOrganisationHeaderTemplate.organisationFooter = organisationFooter;
    if (organisationGreetings)
      UpdateOrganisationHeaderTemplate.organisationGreetings =
        organisationGreetings;

    //organizationLogo
    if (UpdateOrganisationHeaderTemplate.organizationLogo) {
      fs.unlink(
        "." + UpdateOrganisationHeaderTemplate.organizationLogo,
        (err) => {
          if (err) {
            // console.log(err);
          }
        }
      );
    }

    if (
      Array.isArray(req.files.organizationLogo) &&
      req.files.organizationLogo.length > 0
    ) {
      await fs.promises.unlink(
        UpdateOrganisationHeaderTemplate.organizationLogo
      );
      UpdateOrganisationHeaderTemplate.organizationLogo =
        req.files.organizationLogo[0].path;
    }

    //orgCertificateLogo
    if (UpdateOrganisationHeaderTemplate.orgCertificateLogo) {
      fs.unlink(
        "." + UpdateOrganisationHeaderTemplate.orgCertificateLogo,
        (err) => {
          if (err) {
            // console.log(err);
          }
        }
      );
    }

    if (
      Array.isArray(req.files.orgCertificateLogo) &&
      req.files.orgCertificateLogo.length > 0
    ) {
      await fs.promises.unlink(
        UpdateOrganisationHeaderTemplate.orgCertificateLogo
      );
      UpdateOrganisationHeaderTemplate.orgCertificateLogo =
        req.files.orgCertificateLogo[0].path;
    }

    if (!UpdateOrganisationHeaderTemplate) {
      return res.status(404).send({
        success: false,
        message: "OrganisationHeaderTemplate update get error API",
      });
    }

    // save File
    await UpdateOrganisationHeaderTemplate.save();
    res.status(200).send({
      success: true,
      message: "OrganisationHeaderTemplate update Successfully API",
    });
  } catch (error) {
    // console.log("OrganisationHeaderTemplate update getting error", error);
    res.status(500).send({
      success: false,
      message: "OrganisationHeaderTemplate update getting error",
      error,
    });
  }
};

// deleteOrganisationHeaderTemplateController
const deleteOrganisationHeaderTemplateController = async (req, res) => {
  try {
    // get Admin data
    const deleteOrganisationHeaderTemplate =
      await organisationHeaderTemplateModel.findByIdAndDelete({
        _id: req.params.id,
      });

    // console.log(
    //   "deleteOrganisationHeaderTemplate",
    //   deleteOrganisationHeaderTemplate
    // );

    if (!deleteOrganisationHeaderTemplate) {
      return res.status(400).send({
        success: false,
        message: "deleteOrganisationHeaderTemplate delete get not exist Id API",
      });
    }

    await fs.promises.unlink(deleteOrganisationHeaderTemplate.organizationLogo);
    await fs.promises.unlink(
      deleteOrganisationHeaderTemplate.orgCertificateLogo
    );

    // save File
    res.status(200).send({
      success: true,
      message: "deleteOrganisationHeaderTemplate delete Successfully API",
      deleteOrganisationHeaderTemplate,
    });
  } catch (error) {
    // console.log(
    //   "deleteOrganisationHeaderTemplate delete getting error API",
    //   error
    // );
    res.status(500).send({
      success: false,
      message: "deleteOrganisationHeaderTemplate delete getting error API",
      error,
    });
  }
};

//Exports controller
module.exports = {
  createOrganisationHeaderTemplateController,
  getOrganisationHeaderTemplateController,
  updateOrganisationHeaderTemplateController,
  deleteOrganisationHeaderTemplateController,
};
