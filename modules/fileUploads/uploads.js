const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "_" + Date.now() + "_" + path.extname(file.originalname)
    );
  },
});

const uploads = multer({ storage: storage })
  // .single("profilePic");
  .fields([
    { name: "profilePic", maxCount: 1 },
    { name: "organizationPick", maxCount: 1 },
    { name: "variantFile", maxCount: 1 },
    { name: "organizationLogo", maxCount: 1 },
    { name: "orgCertificateLogo", maxCount: 1 },
  ]);

module.exports = uploads;
