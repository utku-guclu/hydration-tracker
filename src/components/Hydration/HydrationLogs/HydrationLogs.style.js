import { styled } from "@mui/system";

export const WaterIntakeLabel = styled("p")(({ isDarkTheme }) => ({
  color: window.innerWidth > 600 ? "var(--dark)" : "inherit",
  cursor: "pointer",
  fontWeight: isDarkTheme ? "unset" : 600,
}));

export const WaterInfoLabel = styled("p")(({ color }) => ({
  color,
  fontWeight: "400",
  fontSize: "12px",
  fontStyle: "italic",
}));

export const LogsHeading = styled("h2")(({ color }) => ({
  color,
  cursor: "pointer",
}));

export const LogsDetails = styled("div")(() => ({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "2em",
}));

export const LogsTable = styled("ul")(() => ({
  // backgroundColor: "var(--gray)",
  display: "grid",
  padding: "20px",
  gap: "10px",
  width: "100%",
}));

export const TableRow = styled("li")(({ bgColor }) => ({
  display: "grid",
  gridTemplateColumns: "1fr auto",
  gap: "1em",
  justifyContent: "center",
  backgroundColor: bgColor,
}));

export const IntakeCol = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
}));

export const TimeCol = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  maxWidth: "fit-content",
}));

export const LogButtons = styled("div")(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "1em",
}));
