const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const hydrationLogController = express.Router();

/* CRUD */

hydrationLogController.post("/", async (req, res) => {
  const { intake } = req.body;

  try {
    const createdLog = await prisma.hydrationLog.create({
      data: {
        intake,
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

hydrationLogController.get("/", async (req, res) => {
  try {
    const logs = await prisma.hydrationLog.findMany({
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

hydrationLogController.delete("/:timestamp", async (req, res) => {
  const { timestamp } = req.params;

  try {
    const existingLog = await prisma.hydrationLog.findFirst({
      where: {
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
});

hydrationLogController.put("/:timestamp", async (req, res) => {
  const { timestamp } = req.params;
  const { intake } = req.body;

  try {
    const existingLog = await prisma.hydrationLog.findFirst({
      where: {
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
});

module.exports = hydrationLogController;
