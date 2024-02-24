import React from "react";
import { Outlet } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";

import { DarkModeSwitch } from "react-toggle-dark-mode";

import { ThemeContext } from "../context/Theme";

import { styled } from "@mui/system";
import { createGlobalStyle } from "styled-components";

const Hydration = styled("div")(({ theme }) => ({
  color: theme.color,
  backgroundColor: theme.backgroundColor,
  display: "inline",
}));

const GlobalStyle = createGlobalStyle`
  body {
    color: ${(props) => props.theme.color};
    background-color: ${(props) => props.theme.backgroundColor};
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
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
