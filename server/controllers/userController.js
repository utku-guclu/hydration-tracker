/* REGISTER */
const express = require("express");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const { v4: uuidv4 } = require('uuid');

const userController = express.Router();
const secretKey = process.env.JWT_SECRET_KEY;

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/* middlewares */
const validatePassword = require("../middlewares/validatePass");
const authenticateToken = require("../middlewares/authToken");

const verifyGoogleToken = require("../middlewares/google");

// Endpoint to create a new user
userController.post("/register", validatePassword, async (req, res) => {
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
        googleId: uuidv4(),
        email: uuidv4(),
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

/* google */
userController.post("/google/signup", async (req, res) => {
  try {
    if (req.body.credential) {
      const verificationResponse = await verifyGoogleToken(req.body.credential);
      if (verificationResponse.error) {
        return res.status(400).json({
          message: verificationResponse.error,
        });
      }

      const profile = verificationResponse?.payload;
      // Add user to the database
      const newUser = await prisma.user.create({
        data: {
          username: profile.email,
          password: "",
          firstName: profile?.given_name,
          lastName: profile?.family_name,
          picture: profile?.picture,
          email: profile.email,
          googleId: profile.jti,
        },
      });

      // Get the user ID
      const userId = newUser.id;

      res.status(201).json({
        message: "Signup was successful",
        user: {
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          picture: newUser.picture,
          email: newUser.email,
          token: jwt.sign(
            { email: newUser.email, userId: newUser.id },
            secretKey,
            {
              expiresIn: "1d",
            }
          ),
        },
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "An error occurred. Registration failed.",
    });
  } finally {
    await prisma.$disconnect(); // Disconnect Prisma client after each request
  }
});

/* admin */

module.exports = userController;
