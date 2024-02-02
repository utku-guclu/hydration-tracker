const express = require("express");
const hydrationLogController = require("../controllers/hydrationLogController");

const hydrationLogRoutes = express.Router();

hydrationLogRoutes.use("/api/hydration-logs", hydrationLogController);

module.exports = hydrationLogRoutes;
