import React, { useEffect, useState } from "react";
import HydrationUpdateDialog from "./HydrationUpdateDialog";
import { useHydration } from "../context/HydrationContext";

function HydrationLogs() {
    const [selectedLog, setSelectedLog] = useState(null);
    const [logs, setLogs] = useState([]);
    const { updateTotalIntake } = useHydration();

    const fetchHydrationLogs = async () => {
        try {
            const response = await fetch(
                "http://localhost:3000/api/hydration-logs",
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.ok) {
                const fetchedLogs = await response.json();
                setLogs(fetchedLogs);
            } else {
                console.error("Failed to fetch hydration logs");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    useEffect(() => {
        fetchHydrationLogs();
    }, []);

    useEffect(() => {
        updateTotalIntake(parseInt(calculateTotalIntake(), 10));
    }, [logs]);

    const handleDelete = async (timestamp) => {
        try {
            const response = await fetch(
                `http://localhost:3000/api/hydration-logs/${timestamp}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.ok) {
                await fetchHydrationLogs();
                // Don't reset selectedLog immediately after deletion
            } else {
                console.error("Failed to delete hydration log");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleUpdate = (log) => {
        setSelectedLog(log);
    };

    const handleCancelUpdate = () => {
        setSelectedLog(null);
    };

    const calculateTotalIntake = () => {
        return logs.reduce((total, log) => total + log.intake, 0);
    };

    return (
        <div>
            <h2>Hydration Logs</h2>
            <p>Total Water Intake: {calculateTotalIntake()} ml</p>
            <ul>
                {logs.map((log) => (
                    <li key={log.timestamp} className="log-item">
                        <p>{`Intake: ${log.intake} ml | Time: ${new Date(
                            log.timestamp
                        ).toLocaleString()}`}</p>
                        <div className="log-details">
                            <button onClick={() => handleUpdate(log)}>
                                Update
                            </button>
                            <button onClick={() => handleDelete(log.timestamp)}>
                                Delete
                            </button>
                        </div>

                        {selectedLog === log && (
                            <HydrationUpdateDialog
                                log={log}
                                onUpdate={() => {
                                    fetchHydrationLogs();
                                    handleCancelUpdate();
                                }}
                                onCancel={handleCancelUpdate}
                            />
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default HydrationLogs;
