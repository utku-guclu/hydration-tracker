import React, { useEffect, useState } from "react";

import HydrationUpdateDialog from "./HydrationUpdateDialog";

import { useHydration } from "../../context/HydrationContext";

import { mlToCups } from "hydration-converter";

import { styled } from "@mui/system";

import { Tooltip } from "react-tooltip";

/* Circular indeterminate */
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

/* Icons */
import { GrUpdate } from "react-icons/gr";
import { TiDeleteOutline } from "react-icons/ti";

const WaterIntakeLabel = styled("p")(({ color }) => ({
  color: "#fff",
  cursor: "pointer",
}));

const LogsHeading = styled("h2")(({ color }) => ({
  color,
  cursor: "pointer",
}));

const LogsDetails = styled("div")(() => ({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "2em",
}));

const LogsTable = styled("ul")(() => ({
  backgroundColor: "#333",
  display: "grid",
  padding: "20px",
  gap: "10px",
}));

const TableRow = styled("li")(({ bgColor }) => ({
  display: "grid",
  gridTemplateColumns: "1fr auto",
  gap: "1em",
  justifyContent: "center",
  backgroundColor: bgColor,
}));

const IntakeCol = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
}));

const TimeCol = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  maxWidth: "fit-content",
}));

const LogButtons = styled("div")(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: ".5em",
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
      setHeadingColor("var(--water)");
    } else {
      setHeadingColor("#333");
    }
  }, [logs]);

  return (
    <>
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

        <WaterIntakeLabel>
          Total Water Intake:{" "}
          <span className="italic water-info">
            {convertedTotal} {unit}
          </span>
        </WaterIntakeLabel>
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
                      <span>
                        {` ${isCup ? mlToCups(log.intake) : log.intake}  ${
                          isCup ? "(cup)" : "(ml)"
                        }`}{" "}
                      </span>
                    </IntakeCol>
                    {/* <span>|</span> */}
                    <TimeCol>
                      <span style={{ color: "var(--ocean)" }}>TIME</span>
                      <span>
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
