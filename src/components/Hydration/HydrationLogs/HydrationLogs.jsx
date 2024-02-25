import React, { useContext, useEffect, useState } from "react";

import HydrationUpdateDialog from "../HydrationUpdateDialog/HydrationUpdateDialog";

import { useHydration } from "../../../context/HydrationContext";

import { mlToCups } from "hydration-converter";

import { Tooltip } from "react-tooltip";

import { ThemeContext } from "../../../context/Theme";

/* Circular indeterminate */
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

/* Icons */
import { GrUpdate } from "react-icons/gr";
import { TiDeleteOutline } from "react-icons/ti";

import {
  WaterIntakeLabel,
  WaterInfoLabel,
  LogsHeading,
  LogsTable,
  TableRow,
  LogsDetails,
  IntakeCol,
  TimeCol,
  LogButtons,
} from "./HydrationLogs.style";

function HydrationLogs() {
  const [headingColor, setHeadingColor] = useState("var(--gray)");
  const [selectedLog, setSelectedLog] = useState(null);
  const {
    logs,
    isLoadingLogs,
    fetchHydrationLogs,
    deleteHydrationLog,
    isCup,
    convertedTotal,
    unit,
    resetLogs,
  } = useHydration();

  const { theme, isDarkTheme } = useContext(ThemeContext);

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
    if (logs.length === 0) {
      setHeadingColor("var(--gray)");
    } else {
      window.innerWidth > 600
        ? setHeadingColor("var(--dark)")
        : setHeadingColor("var(--ocean)");
    }
  }, [logs, window.innerWidth]);

  return (
    <>
      <div>
        {logs.length > 0 && <Tooltip id="logs-heading" />}
        <LogsHeading
          className="hydration-logs-heading"
          data-tooltip-id="logs-heading"
          data-tooltip-content="Double click to reset logs!"
          data-tooltip-place="top"
          onDoubleClick={handleReset}
          color={headingColor}
          isDarkTheme={isDarkTheme}
        >
          Hydration Logs
        </LogsHeading>

        {logs.length > 0 ? (
          <WaterIntakeLabel className="water-intake-label" theme={theme}>
            Total Water Intake:{" "}
            <span
              style={{
                color: window.innerWidth > 600 ? "var(--dark)" : "inherit",
              }}
              className="italic water-info"
            >
              {convertedTotal} {unit}
            </span>
          </WaterIntakeLabel>
        ) : (
          <WaterInfoLabel isDarkTheme={isDarkTheme}>
            No logs yet!
          </WaterInfoLabel>
        )}
        {logs.length > 0 && (
          <LogsTable>
            {/* Loading Circle */}
            {isLoadingLogs ? (
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <CircularProgress />
              </Box>
            ) : (
              /* Logs */
              logs.map((log) => (
                <TableRow key={log.timestamp}>
                  <LogsDetails>
                    <IntakeCol>
                      <span style={{ color: "var(--ocean)" }}>INTAKE</span>
                      <span style={{ color: theme.text }}>
                        {` ${isCup ? mlToCups(log.intake) : log.intake}  ${
                          isCup ? "(cup)" : "(ml)"
                        }`}{" "}
                      </span>
                    </IntakeCol>
                    {/* <span>|</span> */}
                    <TimeCol>
                      <span style={{ color: "var(--ocean)" }}>TIME</span>
                      <span style={{ color: theme.text }}>
                        {new Date(log.timestamp)
                          .toLocaleString()
                          .slice(11)
                          .replace(/\s[AP]M/, "")}
                      </span>
                    </TimeCol>
                  </LogsDetails>

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
                  <LogButtons>
                    <GrUpdate
                      cursor="pointer"
                      size="1.5em"
                      color="var(--secondary-color)"
                      onClick={() => handleUpdate(log)}
                    ></GrUpdate>
                    <TiDeleteOutline
                      cursor="pointer"
                      size="2em"
                      color="var(--danger)"
                      onClick={() => handleDelete(log.timestamp)}
                    ></TiDeleteOutline>
                  </LogButtons>
                </TableRow>
              ))
            )}
          </LogsTable>
        )}
      </div>
    </>
  );
}

export default HydrationLogs;
