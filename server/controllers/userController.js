const express = require("express");
const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const userController = express.Router();

/* middlewares */
const validatePassword = require("../middlewares/validatePass");
const authenticateToken = require("../middlewares/authToken");

// Endpoint to create a new user
userController.post("/user", validatePassword, async (req, res) => {
  const { username, password } = req.body;

  try {
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = userController;
