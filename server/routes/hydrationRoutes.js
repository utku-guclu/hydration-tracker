const express = require("express");
const hydrationLogController = require("../controllers/hydrationLogController");

const hydrationLogRoutes = express.Router();

hydrationLogRoutes.use("/logs", hydrationLogController);

module.exports = hydrationLogRoutes;
