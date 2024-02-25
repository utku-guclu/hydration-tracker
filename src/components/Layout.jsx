import React from "react";
import { Outlet } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";

import { DarkModeSwitch } from "react-toggle-dark-mode";

import { ThemeContext } from "../context/Theme";

import { styled } from "@mui/system";
import { createGlobalStyle } from "styled-components";

const Hydration = styled("main")(({ isDarkTheme, theme }) => ({
  backgroundColor: !isDarkTheme ? "rgba(255, 246, 233, 0.5)" : "",
  padding: "0 20px",
  [theme.breakpoints.down("430px")]: {
    width: "100vw",
    padding: 0,
  },
}));

const GlobalStyle = createGlobalStyle`
  body {
    color: ${(props) => props.theme.color};
    background-color: ${(props) => props.theme.secondaryBackgroundColor};
  }
`;

const Layout = () => {
  const { theme, isDarkTheme, toggleTheme } = React.useContext(ThemeContext);

  return (
    <>
      <GlobalStyle theme={theme} />
      <Header>
        <DarkModeSwitch
          style={{
            marginBottom: "2rem",
            position: "absolute",
            left: "10px",
            top: "10px",
            zIndex: "100",
          }}
          checked={isDarkTheme}
          onChange={toggleTheme}
          size={20}
          sunColor="var(--water)"
        />
      </Header>
      <Hydration isDarkTheme={isDarkTheme}>
        <Outlet />
      </Hydration>
      <Footer />
    </>
  );
};

export default Layout;
