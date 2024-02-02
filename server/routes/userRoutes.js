const express = require("express");
const userController = require("../controllers/userController");

const userRoutes = express.Router();

userRoutes.use("/api", userController);

module.exports = userRoutes;
