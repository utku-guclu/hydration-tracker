import React, { createContext, useState } from "react";

// Define light and dark themes
const lightTheme = {
  backgroundColor: "var(--dark)",
  color: "var(--light)",
  text: "var(--light)",
  secondaryBackgroundColor: "var(--dark)",
};

const darkTheme = {
  backgroundColor: "var(--light)",
  color: "var(--dark)",
  text: "var(--light)",
  secondaryBackgroundColor: "var(--water)",
};

export const ThemeContext = createContext({
  theme: darkTheme,
  isDarkTheme: false,
  toggleTheme: () => {},
});

const ThemeProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = () => {
    setIsDarkTheme((prev) => !prev);
  };

  const theme = isDarkTheme ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme, isDarkTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
