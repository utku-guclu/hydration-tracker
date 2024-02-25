import { styled } from "@mui/system";

import { ThemeContext } from "../../../context/Theme";
import { useContext } from "react";

export const Bubble = styled("div")(({ filledPercentage, theme }) => {
  const { isDarkTheme } = useContext(ThemeContext);

  return {
    transition: "all 1s ease-out",
    display: isDarkTheme ? "inherit" : "none",
    width: "30px",
    height: "30px",
    position: "absolute",
    borderRadius: "50%",
    top: `calc(-${filledPercentage}% + 155px)`,
    right: "calc(50% - 15px)",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    boxShadow: `${
      filledPercentage === 100 ? "0 0 10px rgba(255, 255, 255, 0.7)" : ""
    }`,
    animation: "riseBubble 3s ease-in-out, float 3s ease-in-out infinite",
    transform: `translateY(calc(-${filledPercentage}%)) rotate(0)`,
    zIndex: "1",
    cursor: "pointer",
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
    "@keyframes float": {
      "0%": {
        transform: "translateY(-5px)",
      },
      "50%": {
        transform: "translateY(-10px)",
      },
      "100%": {
        transform: "translateY(-5px)",
      },
    },
    "@keyframes riseBubble": {
      "0%": {
        top: `calc(-${0}% + 155px)`,
      },
      "100%": {
        top: `calc(-${filledPercentage}% + 155px)`,
      },
    },
  };
});

export const BottleContainer = styled("div")(({ filledPercentage, theme }) => {
  const { isDarkTheme } = useContext(ThemeContext);
  return {
    width: "100%",
    transition: "all 1s ease-out",
    position: isDarkTheme ? "relative" : "absolute",
    bottom: isDarkTheme ? "unset" : 0,
    left: isDarkTheme ? "unset" : 0,
    height: isDarkTheme ? "10rem" : "100%",
    zIndex: isDarkTheme ? "unset" : -1,
    outline: "0",
    overflow: "hidden",
    backgroundColor: "var(--water)",
    [theme.breakpoints.up("sm")]: {
      position: "absolute",
      bottom: 0,
      left: 0,
      height: "100%",
      zIndex: -1,
    },
    "&::before": {
      transition: "all 1s ease-out",
      position: "absolute",
      content: '""',
      height: `100%`,
      width: "200%",
      bottom: "-100%",
      left: "-50%",
      borderRadius: "0%",
      background: "var(--ocean)",
      transform: `translateY(calc(-${filledPercentage}%)) rotate(0)`,
      animation: "rise 3s ease-in-out",
      [theme.breakpoints.up("sm")]: {
        position: "absolute",
        zIndex: -1,
      },
    },
    "@keyframes rise": {
      "0%": {
        transform: `translateY(0) rotate(0)`,
      },
      "100%": {
        transform: `translateY(-${filledPercentage}%) rotate(0)`,
      },
    },
  };
});
