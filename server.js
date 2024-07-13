const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cookie = require("cookie-parser");

const connectDb = require("./modules/config/db");
const adminRoute = require("./modules/routes/adminRoutes");
const otpRoutes = require("./modules/routes/otpRoutes");
const dimensionRoutes = require("./modules/routes/dimensionRoutes");
const stateRoutes = require("./modules/routes/stateRoutes");
const cityRoute = require("./modules/routes/cityRoutes");
const organizationRoutes = require("./modules/routes/organizationRoutes");
const businessTypeRoutes = require("./modules/routes/businessTypeRoutes");
const productRoutes = require("./modules/routes/productRoutes");
const projectTypeRoutes = require("./modules/routes/projectTypeRoutes");
const clientRoutes = require("./modules/routes/clientRoutes");
const componentRoutes = require("./modules/routes/componentRoutes");
const variantRoutes = require("./modules/routes/variantRoutes");
const companyIntroRoutes = require("./modules/routes/companyIntroRoutes");
const paymentTermsRoutes = require("./modules/routes/paymentTermsRoutes");
const organisationHeaderTemplateRoutes = require("./modules/routes/organisationHeaderTemplateRoutes");
const clientandProjectRoutes = require("./modules/routes/clientandProjectRoutes");
const quotationTemplateRoutes = require("./modules/routes/quotationTemplateRoutes");
const quotationRevisionRoutes = require("./modules/routes/quotationRevisionRoutes");
const followUpRoutes = require("./modules/routes/followUpRoutes");

// config
require("dotenv").config();

//Database configuration
connectDb();

// Express connection
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false, limit: "1gb" }));
app.use(express.json());

//API RESPONSE UPDATE
app.use(morgan("dev"));
app.use(cookie());

app.use("/uploads", express.static("uploads"));

//PORT
const PORT = process.env.PORT || 8080;

//api
// app.get("/", (req, res) => {
//   res.send("<h1>Welcome to DigiKraft_Social</h1>");
// });

const prefix = "/api/v1";

app.use(prefix, adminRoute);
app.use(prefix, otpRoutes);
app.use(prefix, dimensionRoutes);
app.use(prefix, stateRoutes);
app.use(prefix, cityRoute);
app.use(prefix, organizationRoutes);
app.use(prefix, businessTypeRoutes);
app.use(prefix, productRoutes);
app.use(prefix, projectTypeRoutes);
app.use(prefix, clientRoutes);
app.use(prefix, componentRoutes);
app.use(prefix, variantRoutes);
app.use(prefix, companyIntroRoutes);
app.use(prefix, paymentTermsRoutes);
app.use(prefix, organisationHeaderTemplateRoutes);
app.use(prefix, clientandProjectRoutes);
app.use(prefix, quotationTemplateRoutes);
app.use(prefix, quotationRevisionRoutes);
app.use(prefix, followUpRoutes);

// Listen port
app.listen(PORT, () => {
  console.log(`Server run on Port : http://localhost:${PORT}`);
});
