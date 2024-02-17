/* REGISTER */
const express = require("express");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const userController = express.Router();
const secretKey = process.env.JWT_SECRET_KEY;

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/* middlewares */
const validatePassword = require("../middlewares/validatePass");
const authenticateToken = require("../middlewares/authToken");

// Endpoint to create a new user
userController.post("/", validatePassword, async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the username is already taken
    const existingUser = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (existingUser) {
      return res.status(400).json({ error: "Username is already taken" });
    }

    // Hash the password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user
    const newUser = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });

    // Get the user ID
    const userId = newUser.id;

    // Generate a token (you may use a more secure method in production)
    const token = jwt.sign({ userId: newUser.id }, secretKey, {
      expiresIn: "1h",
    });

    const access = {
      token,
      username,
      userId,
    };

    console.log("user created!");
    // Return the token in the response
    res.status(201).json(access);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = userController;
