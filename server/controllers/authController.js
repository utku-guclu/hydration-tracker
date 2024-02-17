// For user login and registration
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const secretKey = process.env.JWT_SECRET_KEY;
const authController = express.Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/* middlewares */
const validatePassword = require("../middlewares/validatePass");
const authenticateToken = require("../middlewares/authToken");

// Login endpoint with password validation and JWT token creation
authController.post("/login", validatePassword, async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // Get the user ID
    const userId = user.id;

    const token = jwt.sign({ userId: user.id }, secretKey, {
      expiresIn: "1h",
    });

    const access = {
      token,
      username,
      userId,
    };

    res.status(200).json(access);
    console.log("user accessed!");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Use authenticateToken as middleware for protected routes
authController.post("/access", authenticateToken, (req, res) => {
  // Access granted for authenticated users
  try {
    res.json({ message: "Access granted to protected route", status: true });
  } catch (error) {
    console.error("Error:", error);
    res.status(403).json({ error: "Access Denied", status: false });
  }
});

module.exports = authController;
