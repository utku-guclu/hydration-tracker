import React, { useEffect, useState } from "react";

import HydrationUpdateDialog from "./HydrationUpdateDialog";

import { useHydration } from "../../context/HydrationContext";

import { ProgressBar } from "../ProgressBar";

import { mlToCups } from "hydration-converter";

import { styled } from "@mui/system";

import { Tooltip } from "react-tooltip";

// Circular indeterminate
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const LogsHeading = styled("h2")(({ color }) => ({
  color: color,
  cursor: "pointer",
}));

function HydrationLogs() {
  const [headingColor, setHeadingColor] = useState("#333");
  const [selectedLog, setSelectedLog] = useState(null);
  const {
    logs,
    isLoadingLogs,
    fetchHydrationLogs,
    deleteHydrationLog,
    isCup,
    convertedTotal,
    convertedDailyGoal,
    unit,
    resetLogs,
  } = useHydration();

  const handleReset = () => {
    resetLogs();
  };

  const handleDelete = (timestamp) => {
    deleteHydrationLog(timestamp);
  };

  const handleUpdate = (log) => {
    setSelectedLog(log);
  };

  const handleCancelUpdate = () => {
    setSelectedLog(null);
  };

  useEffect(() => {
    fetchHydrationLogs();
  }, []);

  useEffect(() => {
    if (logs.length !== 0) {
      setHeadingColor("var(--main-color)");
    } else {
      setHeadingColor("#333");
    }
  }, [logs]);

  return (
    <>
      <ProgressBar
        convertedDailyGoal={convertedDailyGoal}
        unit={unit}
        convertedTotal={convertedTotal}
      />
      <div>
        {logs.length > 0 && <Tooltip id="logs-heading" />}
        <LogsHeading
          data-tooltip-id="logs-heading"
          data-tooltip-content="Double click to reset logs!"
          data-tooltip-place="top"
          onDoubleClick={handleReset}
          color={headingColor}
        >
          Hydration Logs
        </LogsHeading>

        <p>
          Total Water Intake:{" "}
          <span className="italic water-info">
            {convertedTotal} {unit}
          </span>
        </p>
        <ul>
          {/* Loading Circle */}
          {isLoadingLogs && (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <CircularProgress />
            </Box>
          )}
          {/* Loading Circle */}

          {/* Logs */}
          {logs.map((log) => (
            <li key={log.timestamp} className="log-item">
              <p>{`Intake: ${isCup ? mlToCups(log.intake) : log.intake}  ${
                isCup ? "(cup)" : "(ml)"
              } | Time: ${new Date(log.timestamp).toLocaleString()}`}</p>
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
          {/* Logs */}
        </ul>
      </div>
    </>
  );
}

export default HydrationLogs;
