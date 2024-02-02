const express = require("express");
const userController = require("../controllers/userController");

const userRoutes = express.Router();

userRoutes.use("/register", userController);

module.exports = userRoutes;
