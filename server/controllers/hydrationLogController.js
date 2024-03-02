const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const hydrationLogController = express.Router();

const authenticateToken = require("../middlewares/authToken");

/* generate image */
const generateImage = require("../utils/generateImage");
const getOrSetCache = require("../utils/getOrSetCache");

/* STATISTICS */

// Separate endpoint for adding new log pools
hydrationLogController.post(
  "/statistics",
  authenticateToken,
  async (req, res) => {
    const { intake } = req.body;
    const { userId } = req.user;

    try {
      if (!intake) {
        return res.status(400).json({ error: "Intake value is required" });
      }

      const createdLogPool = await prisma.logPool.create({
        data: {
          intake,
          user: { connect: { id: userId } },
          timestamp: new Date(),
        },
      });

      console.log("Hydration log pool added successfully");
      res.status(201).json(createdLogPool);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

hydrationLogController.delete(
  "/statistics",
  authenticateToken,
  async (req, res) => {
    const { userId } = req.user;

    try {
      const deleteResult = await prisma.logPool.deleteMany({
        where: { userId: parseInt(userId) },
      });

      console.log(
        `${deleteResult.count} hydration log pools deleted successfully`
      );
      res.status(204).end();
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

/* RESET LOGS */
hydrationLogController.delete("/reset", authenticateToken, async (req, res) => {
  const { userId } = req.user;
  if (!userId) {
    return res.status(400).json({ error: "User ID not provided" });
  }

  try {
    // Find all existing logs for the user
    const userLogs = await prisma.hydrationLog.findMany({
      where: {
        userId: parseInt(userId),
      },
    });

    // If no logs found for the user, return success
    if (userLogs.length === 0) {
      console.log("No hydration logs found for the user");
      return res
        .status(204)
        .json({ message: "No hydration logs found for the user" });
    }

    // Delete all logs associated with the user
    await prisma.hydrationLog.deleteMany({
      where: {
        userId: parseInt(userId), // Assuming userId is stored as an integer
      },
    });

    console.log("Hydration logs deleted successfully");
    res.status(204).end();
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

/* CRUD */

hydrationLogController.post("/", authenticateToken, async (req, res) => {
  const { intake } = req.body;

  // Extract user ID from the request object (assuming it was attached by the authenticateToken middleware)
  const { userId } = req.user;
  console.log(req.user);

  try {
    const createdLog = await prisma.hydrationLog.create({
      data: {
        intake,
        user: { connect: { id: userId } },
      },
    });

    console.log("Hydration log added successfully");
    res.status(201).json({
      message: "Hydration log added successfully",
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

hydrationLogController.get("/", authenticateToken, async (req, res) => {
  try {
    const { userId } = req.user; // Extract user ID from the request object

    const logs = await prisma.hydrationLog.findMany({
      where: {
        userId: parseInt(userId), // Filter logs by user ID
      },
      select: {
        intake: true,
        timestamp: true,
      },
      orderBy: {
        timestamp: "desc",
      },
    });

    res.status(200).json(logs);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
hydrationLogController.get(
  "/statistics",
  authenticateToken,
  async (req, res) => {
    try {
      const { userId } = req.user;

      const userLogPools = await prisma.logPool.findMany({
        where: { userId: parseInt(userId) },
        select: { intake: true, timestamp: true },
      });

      // Calculate statistics
      const totalIntake = userLogPools.reduce(
        (acc, logPool) => acc + logPool.intake,
        0
      );

      const statistics = {
        totalIntake,
        logCount: userLogPools.length,
        logPools: userLogPools.map(({ intake, timestamp }) => ({
          intake,
          timestamp,
        })),
      };

      res.status(200).json(statistics);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);
hydrationLogController.delete(
  "/:timestamp",
  authenticateToken,
  async (req, res) => {
    const { userId } = req.user;

    const { timestamp } = req.params;

    try {
      const existingLog = await prisma.hydrationLog.findFirst({
        where: {
          userId: parseInt(userId),
          timestamp: new Date(timestamp),
        },
      });

      if (existingLog) {
        await prisma.hydrationLog.delete({
          where: {
            id: existingLog.id,
          },
        });

        console.log("Hydration log deleted successfully");
        res.status(204).end();
      } else {
        console.error("Hydration log not found");
        res.status(404).json({ error: "Hydration log not found" });
      }
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

hydrationLogController.put(
  "/:timestamp",
  authenticateToken,
  async (req, res) => {
    const { userId } = req.user;

    const { timestamp } = req.params;
    const { intake } = req.body;

    try {
      const existingLog = await prisma.hydrationLog.findFirst({
        where: {
          userId: parseInt(userId),
          timestamp: new Date(timestamp),
        },
      });

      if (existingLog) {
        const updatedLog = await prisma.hydrationLog.update({
          where: {
            id: existingLog.id,
          },
          data: {
            intake,
          },
        });

        console.log("Hydration log updated successfully");
        res.status(200).json(updatedLog);
      } else {
        console.error("Hydration log not found");
        res.status(404).json({ error: "Hydration log not found" });
      }
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

hydrationLogController.post(
  "/generateImage",
  authenticateToken,
  async (req, res) => {
    try {
      const { hydrationStatus } = req.body; 
      // Use getOrSetCache function to retrieve or set the value from/to cache
      await getOrSetCache(hydrationStatus, async () => {
        const response = await generateImage(hydrationStatus); // Generate the image based on the caption
        res.status(200).json(response);
      });
      const response = await generateImage(hydrationStatus);
      console.log(response);
      return res.json(response);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

module.exports = hydrationLogController;
