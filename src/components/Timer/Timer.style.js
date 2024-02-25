import { styled } from "@mui/system";

export const TimerHeading = styled("h2")(({ color }) => ({
  color,
  cursor: "pointer",
  display: "inline",
}));

export const TimerSetting = styled("div")(({ color }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "2em",
  marginTop: "20px",
  backgroundColor: "var(--gray)",
  padding: "1em",
  color,
}));

export const TimerButtons = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "1em",
  fontSize: "20px",
}));

export const TimerDigits = styled("div")(() => ({
  fontSize: "30px",
}));
