import React, { createContext, useCallback, useEffect, useState } from "react";

// Define light and dark themes
const darkTheme = {
  backgroundColor: "var(--dark)",
  color: "var(--ocean)",
  secondaryColor: "var(--dark)",
  text: "var(--sea)",
  secondaryBackgroundColor: "var(--dark)",
  alternativeBackgroundColor: "var(--light)",
  label: "var(--secondary-color)",
  idle: "var(--gray)",
  statistics: "var(--statistics)",
  hydrated: "var(--water)",
  sea: "var(--sea)",
  ocean: "var(--ocean)",
  threat: "var(--threat)",
  warning: "var(--warning)",
  danger: "var(--danger)",
  greeting: "var(--greeting)",
  secondaryLabel: "var(--ocean)",
  secondaryStatistics: "var(--statistics)",
  inlineText: "var(--water)",
  light: "var(--light)",
};

const lightTheme = {
  backgroundColor: "var(--light)",
  color: "var(--dark)",
  secondaryColor: "var(--light)",
  text: "var(--sea)",
  secondaryBackgroundColor: "var(--water)",
  alternativeBackgroundColor: "inherit",
  label: "var(--dark)",
  idle: "var(--gray)",
  hydrated: "var(--dark)",
  sea: "var(--sea)",
  ocean: "var(--ocean)",
  threat: "var(--threat)",
  warning: "#920f79",
  danger: "#a41037",
  statistics: "var(--dark)",
  greeting: "var(--dark)",
  secondaryLabel: "var(--dark)",
  secondaryStatistics: "var(--black)",
  inlineText: "var(--water)",
  light: "var(--light)",
};

export const ThemeContext = createContext({
  theme: darkTheme,
  isDarkTheme: false,
  toggleTheme: () => {},
});

const ThemeProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(() => {
    // activate light theme on larger screens
    try {
      if (window.innerWidth > 600) {
        return false;
      }

      const storedTheme = localStorage.getItem("theme");
      return storedTheme === "dark";
    } catch (error) {
      console.error("Error retrieving theme from local storage:", error);
      return false;
    }
  });
  const [lg, setLg] = useState(window.innerWidth > 600);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 600) {
        setLg(true);
      } else {
        setLg(false);
      }
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    // switch to light theme automatically
    if (lg && isDarkTheme) {
      setIsDarkTheme(false);
    }
  }, [lg, isDarkTheme]);

  // toggle only on small screens
  const checkToggle = useCallback(() => {
    if (!lg) {
      setIsDarkTheme((prev) => !prev);
    }
  }, [lg]);

  const toggleTheme = () => {
    checkToggle();
    // Save theme choice to local storage
    localStorage.setItem("theme", !isDarkTheme ? "dark" : "light");
  };

  const theme = isDarkTheme ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme, isDarkTheme, toggleTheme, lg }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
