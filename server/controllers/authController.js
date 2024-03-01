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
const verifyGoogleToken = require("../middlewares/google");

/* redis */

// Login endpoint with password validation and JWT token creation
authController.post("/login", async (req, res) => {
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
    console.log("user logged in!");
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

/* google */
authController.post("/google/signin", async (req, res) => {
  try {
    if (req.body.credential) {
      const verificationResponse = await verifyGoogleToken(req.body.credential);
      if (verificationResponse.error) {
        return res.status(400).json({
          message: verificationResponse.error,
        });
      }

      const email = verificationResponse?.payload?.email;

      // Find profile in db
      const user = await prisma.user
        .findUnique({
          where: {
            email,
          },
        })
        .catch((err) => console.log(err));

      if (!user) {
        return res
          .status(401)
          .json({ error: "You are not registered. Please sign up" });
      }

      // Get the user ID
      const userId = user.id;

      res.status(201).json({
        message: "Login was successful",
        user: {
          firstName: user?.firstName,
          lastName: user?.lastName,
          picture: user?.picture,
          email: user?.email,
          token: jwt.sign({ email: user?.email, userId: user.id }, secretKey, {
            expiresIn: "1d",
          }),
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error?.message || error,
    });
  }
});

authController.get("/ai", authenticateToken, async (req, res) => {
  const DEFAULT_EXPIRATION = 3600;
  const SECRET_MESSAGE = "Saruman";

  try {
    // Store the secret message in Redis with an expiration time

    (async () => {
      redisClient.on("error", (err) => console.log("Redis Client Error", err));

      await redisClient.connect();
    })();
    redisClient.set(
      "ai",
      DEFAULT_EXPIRATION,
      SECRET_MESSAGE,
      (error, result) => {
        if (error) {
          console.error("Error storing data in Redis:", error);
          res
            .status(500)
            .json({ error: "Internal server error", status: false });
        } else {
          console.log("Data stored in Redis:", result);
          res.json({
            message: "Access granted to protected route",
            status: true,
          });
        }

        // Close the Redis client after the operation is complete
        redisClient.quit();
      }
    );
  } catch (error) {
    console.error("Error:", error);
    res.status(403).json({ error: "Access Denied", status: false });
  }
});

module.exports = authController;
