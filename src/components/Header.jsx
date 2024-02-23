import React from "react";
import { Link, useLocation } from "react-router-dom";

import { styled } from "@mui/system";

import Logout from "./User/Logout";
import { HydrationUnitLogo } from "./Hydration/HydrationUnitLogo";

/* Hooks */
import { useUser } from "../context/UserContext";

/* Semantic Header */
const StyledHeader = styled("header")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px 0 0",
  backgroundColor: "var(--gray)",
  position: "relative",
  // borderRadius: "4px",
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
});

const StyledHeading = styled("h1")({
  marginBottom: 0,
  color: "var(--ocean)",
});

const StyledNav = styled("nav")({
  marginBottom: "10px",
  ul: {
    listStyle: "none",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "20px",
  },
  li: {
    fontSize: "18px",
  },
  a: {
    color: "var(--light)",
    textDecoration: "none",
    "&:hover": {
      color: "var(--water)",
    },
  },
});

const Header = ({ children }) => {
  const location = useLocation();

  const { token: authenticated, logout } = useUser();

  return (
    <StyledHeader>
      <StyledHeading>Hydration Tracker</StyledHeading>
      {children}
      {location.pathname === "/" && <HydrationUnitLogo />}

      <StyledNav>
        <ul>
          {/* Render the "Home" link only if not on the home page */}
          {location.pathname !== "/" && (
            <li>
              <Link to="/">Home</Link>
            </li>
          )}
          {/* Render the "Login" link only if not on the login page and user is not logged in */}
          {location.pathname !== "/login" && !authenticated && (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
          {/* Render the "Register" link only if not on the register page and user is not logged in */}
          {location.pathname !== "/register" && !authenticated && (
            <li>
              <Link to="/register">Register</Link>
            </li>
          )}
          {/* Render the "Logout" link only if user is logged in */}
          {authenticated && (
            <li>
              <Logout logout={logout}>Logout</Logout>
            </li>
          )}
        </ul>
      </StyledNav>
    </StyledHeader>
  );
};

export default Header;
