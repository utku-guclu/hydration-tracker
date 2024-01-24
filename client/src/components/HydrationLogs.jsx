    import React, { useEffect, useState } from "react";
    import HydrationUpdateForm from "./HydrationUpdateForm";

    function HydrationLogs() {
        const [selectedLog, setSelectedLog] = useState(null);
        const [logs, setLogs] = useState([]);

        const fetchHydrationLogs = async () => {
            try {
                const response = await fetch("http://localhost:3008/api/hydration-logs", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

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
        }, []); // Empty dependency array to fetch logs only once on mount

        const handleDelete = async (timestamp) => {
            try {
                const response = await fetch(`http://localhost:3008/api/hydration-logs/${timestamp}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

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
            // Reset selected log when canceling update
            setSelectedLog(null);
        };

        return (
            <div>
                <h2>Hydration Logs</h2>
                <ul>
                    {logs.map((log) => (
                        <li key={log.timestamp}>
                            <div>
                                <p>{`Intake: ${log.intake} ml`}</p>
                                <button onClick={() => handleUpdate(log)}>
                                    Update
                                </button>
                            </div>

                            <button onClick={() => handleDelete(log.timestamp)}>
                                Delete
                            </button>

                            {/* Render the update form conditionally */}
                            {selectedLog === log && (
                                <HydrationUpdateForm
                                    log={log}
                                    onUpdate={fetchHydrationLogs} // Pass the fetch function as callback
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
