const express = require("express");
const router = express.Router();

//Import Controller
const uploads = require("../fileUploads/uploads");
const {
  createOrganizationController,
  getOrganizationController,
  updateOrganizationController,
  deleteOrganizationController,
} = require("../controllers/organizationController");

//Route configure
router.post(
  "/admin/create-organization",
  uploads,
  createOrganizationController
);
router.get("/admin/get-organization", getOrganizationController);
router.put("/admin/update-organization/:id", uploads, updateOrganizationController);
router.delete("/admin/delete-organization/:id", deleteOrganizationController);

module.exports = router;
