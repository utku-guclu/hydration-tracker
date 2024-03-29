const express = require("express");
const userController = require("../controllers/userController");

const userRoutes = express.Router();

userRoutes.use("/", userController);

module.exports = userRoutes;
