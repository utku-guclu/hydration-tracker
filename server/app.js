// server.js or index.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const app = express();
const PORT = process.env.PORT || 3000;

const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.post("/api/hydration-logs", async (req, res) => {
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

app.get("/api/hydration-logs", async (req, res) => {
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

// DELETE endpoint to remove a hydration log by timestamp
// DELETE endpoint to remove a hydration log by timestamp
app.delete("/api/hydration-logs/:timestamp", async (req, res) => {
    const { timestamp } = req.params;

    try {
        // Find the hydration log with the given timestamp
        const existingLog = await prisma.hydrationLog.findFirst({
            where: {
                timestamp: new Date(timestamp),
            },
        });

        // If the log exists, delete it using the timestamp
        if (existingLog) {
            await prisma.hydrationLog.delete({
                where: {
                    id: existingLog.id,
                },
            });

            console.log("Hydration log deleted successfully");
            res.status(204).end();
        } else {
            // If the log does not exist, return a 404 response
            console.error("Hydration log not found");
            res.status(404).json({ error: "Hydration log not found" });
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// PUT endpoint to update a hydration log by timestamp
app.put("/api/hydration-logs/:timestamp", async (req, res) => {
    const { timestamp } = req.params;
    const { intake } = req.body;

    try {
        // Find the hydration log with the given timestamp
        const existingLog = await prisma.hydrationLog.findFirst({
            where: {
                timestamp: new Date(timestamp),
            },
        });

        // If the log exists, update it using the timestamp
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
            // If the log does not exist, return a 404 response
            console.error("Hydration log not found");
            res.status(404).json({ error: "Hydration log not found" });
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
