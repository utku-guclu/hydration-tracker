const express = require("express");
const authController = require("../controllers/authController");

const authRoutes = express.Router();

authRoutes.use("/login", authController);

module.exports = authRoutes;
