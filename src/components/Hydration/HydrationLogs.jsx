import React, { useEffect, useState } from "react";

import HydrationUpdateDialog from "./HydrationUpdateDialog";

import { useHydration } from "../../context/HydrationContext";

import { ProgressBar } from "../ProgressBar";

import { styled } from "@mui/system";

const LogsHeading = styled("h2")(({ color }) => ({
  color: color,
}));

function HydrationLogs() {
  const [headingColor, setHeadingColor] = useState("#333");
  const [selectedLog, setSelectedLog] = useState(null);
  const { logs, fetchHydrationLogs, dailyGoal, deleteHydrationLog } =
    useHydration();

  const handleDelete = (timestamp) => {
    deleteHydrationLog(timestamp);
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

  useEffect(() => {
    fetchHydrationLogs();
  }, []);

  useEffect(() => {
    if (logs.length !== 0) {
      setHeadingColor("#646cff");
    } else {
      setHeadingColor("#333");
    }
  }, [logs]);

  return (
    <>
      <ProgressBar totalIntake={calculateTotalIntake()} dailyGoal={dailyGoal} />
      <div>
        <LogsHeading color={headingColor}>Hydration Logs</LogsHeading>
        <p>
          Total Water Intake:{" "}
          <span className="italic water-info">{calculateTotalIntake()} ml</span>
        </p>
        <ul>
          {logs.map((log) => (
            <li key={log.timestamp} className="log-item">
              <p>{`Intake: ${log.intake} ml | Time: ${new Date(
                log.timestamp
              ).toLocaleString()}`}</p>
              <div className="log-details">
                <button onClick={() => handleUpdate(log)}>Update</button>
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
    </>
  );
}

export default HydrationLogs;
