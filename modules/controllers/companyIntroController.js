const companyIntroModel = require("../models/companyIntroModel");

// createCompanyIntroController
const createCompanyIntroController = async (req, res) => {
  try {
    const { companyIntroType, companyIntroSubject, companyIntroMisc } =
      req.body;

    //Validation
    if (!companyIntroType || !companyIntroSubject || !companyIntroMisc) {
      return res.status(404).send({
        success: false,
        message: "Please Provide all companyIntro fields API",
      });
    }

    // createcompanyIntro
    const createcompanyIntro = await companyIntroModel.create({
      companyIntroType,
      companyIntroSubject,
      companyIntroMisc,
    });

    if (!createcompanyIntro) {
      return res.status(404).send({
        success: false,
        message: "companyIntro Fields Create get error API",
      });
    }

    await createcompanyIntro.save();
    // save File
    res.status(200).send({
      success: true,
      message: "companyIntro Created Successfully API",
      createcompanyIntro,
    });
  } catch (error) {
    // console.log("business create getting error", error);
    res.status(500).send({
      success: false,
      message: "companyIntro create getting error",
      error,
    });
  }
};

// getCompanyIntroController
const getCompanyIntroController = async (req, res) => {
  try {
    const getCompanyIntro = await companyIntroModel.find({});

    if (!getCompanyIntro) {
      return res.status(404).send({
        success: false,
        message: "companyIntro data getting faild API",
      });
    }

    // console.log("getCompanyIntro", getCompanyIntro);
    return res.status(200).send({
      success: true,
      message: "getCompanyIntro getting Successfully API",
      getCompanyIntro,
    });
  } catch (error) {
    // console.log("getCompanyIntro Data getting error", error);
    res.status(500).send({
      success: false,
      message: "getCompanyIntro Data getting error",
      error,
    });
  }
};

// updateCompanyIntroController
const updateCompanyIntroController = async (req, res) => {
  try {
    const { companyIntroType, companyIntroSubject, companyIntroMisc } =
      req.body;

    //Validation
    if (!companyIntroType || !companyIntroSubject || !companyIntroMisc) {
      return res.status(404).send({
        success: false,
        message: "Please Provide companyIntro fields",
      });
    }

    //get companyIntro data
    const companyIntroData = await companyIntroModel.findById({
      _id: req.params.id,
    });

    if (!companyIntroData) {
      return res.status(404).send({
        success: false,
        message: "companyIntro update get error API",
      });
    }

    //Updateion
    if (companyIntroType) companyIntroData.companyIntroType = companyIntroType;
    if (companyIntroSubject)
      companyIntroData.companyIntroSubject = companyIntroSubject;
    if (companyIntroMisc) companyIntroData.companyIntroMisc = companyIntroMisc;

    // save File
    await companyIntroData.save();
    res.status(200).send({
      success: true,
      message: "companyIntro data update Successfully API",
    });
  } catch (error) {
    // console.log("companyIntro update getting error", error);
    res.status(500).send({
      success: false,
      message: "companyIntro update getting error",
      error,
    });
  }
};

// deleteCompanyIntroController
const deleteCompanyIntroController = async (req, res) => {
  try {
    // get companyIntro data
    const deleteCompanyIntro = await companyIntroModel.findByIdAndDelete(req.params.id);

    // console.log("deleteCompanyIntro", deleteCompanyIntro);

    if (!deleteCompanyIntro) {
      return res.status(400).send({
        success: false,
        message: "delete deleteCompanyIntro fields not found error API",
      });
    }

    res.status(200).send({
      success: true,
      message: "companyIntro fields delete Successfully API",
      deleteCompanyIntro,
    });
  } catch (error) {
    // console.log("companyIntro fields delete getting error API", error);
    res.status(500).send({
      success: false,
      message: "companyIntro fields delete getting error API",
      error,
    });
  }
};

//Exports controller
module.exports = {
  createCompanyIntroController,
  getCompanyIntroController,
  updateCompanyIntroController,
  deleteCompanyIntroController,
};
