const express = require("express");
const router = express.Router();

//Import Controller
const uploads = require("../fileUploads/uploads");
const {
  createOrganisationHeaderTemplateController,
  getOrganisationHeaderTemplateController,
  updateOrganisationHeaderTemplateController,
  deleteOrganisationHeaderTemplateController,
} = require("../controllers/organisationHeaderTemplateController");

//Route configure

//Routes
router.post(
  "/admin/create-organisationheadertemplate",
  uploads,
  createOrganisationHeaderTemplateController
);
router.get(
  "/admin/get-organisationheadertemplate",
  getOrganisationHeaderTemplateController
);
router.put(
  "/admin/update-organisationheadertemplate/:id",
  uploads,
  updateOrganisationHeaderTemplateController
);
router.delete(
  "/admin/delete-organisationheadertemplate/:id",
  deleteOrganisationHeaderTemplateController
);

module.exports = router;
