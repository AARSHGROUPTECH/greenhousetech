const projectTypeModel = require("../models/projectTypeModel");

// createProjectController
const createProjectController = async (req, res) => {
  try {
    const { projectName } = req.body;

    const createProject = await projectTypeModel.create({
      projectName: projectName,
    });

    if (!createProject) {
      return res.status(404).send({
        success: false,
        message: "Invalid credential ProjectType API",
      });
    }

    res.status(200).send({
      success: true,
      message: "ProjectType created successfully API",
      createProject,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "ProjectType creation getting error API",
      error,
    });
  }
};

// getProjectController
const getProjectController = async (req, res) => {
  try {
    const data = await projectTypeModel.find({});

    if (!data) {
      return res.status(404).send({
        success: false,
        message: "Invalid credential ProjectType API",
      });
    }

    res.status(200).send({
      success: true,
      message: "ProjectType get successfully API",
      data,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Invalid credential ProjectType API",
    });
  }
};

// updateProjectController
const updateProjectController = async (req, res) => {
  try {
    const { projectName } = req.body;

    //Validation
    if (!projectName) {
      return res.status(404).send({
        success: false,
        message: "Please Provide ProjectType fields",
      });
    }

    //get ProjectType data
    const ProjectTypeData = await projectTypeModel.findById(req.params.id);
    if (!ProjectTypeData) {
      return res.status(404).send({
        success: false,
        message: "ProjectType update get error API",
      });
    }

    //Updateion
    if (projectName) ProjectTypeData.projectName = projectName;

    // save File
    await ProjectTypeData.save();
    res.status(200).send({
      success: true,
      message: "ProjectType data update Successfully API",
    });
  } catch (error) {
    // console.log("ProjectType update getting error", error);
    res.status(500).send({
      success: false,
      message: "ProjectType update getting error",
      error,
    });
  }
};

// deleteProjectController
const deleteProjectController = async (req, res) => {
  try {
    // get ProjectType data
    const deleteProjectType = await projectTypeModel.findByIdAndDelete({
      _id: req.params.id,
    });

    // console.log("deleteProjectType", deleteProjectType);

    if (!deleteProjectType) {
      return res.status(400).send({
        success: false,
        message: "delete ProjectType fields not found error API",
      });
    }

    // save File
    res.status(200).send({
      success: true,
      message: "ProjectType fields delete Successfully API",
      deleteProjectType,
    });
  } catch (error) {
    // console.log("ProjectType fields delete getting error API", error);
    res.status(500).send({
      success: false,
      message: "ProjectType fields delete getting error API",
      error,
    });
  }
};

//Exports controller
module.exports = {
  createProjectController,
  getProjectController,
  updateProjectController,
  deleteProjectController,
};
