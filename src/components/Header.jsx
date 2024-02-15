import React from "react";
import { Link, useLocation } from "react-router-dom";

import Logout from "./User/Logout";

import { useUser } from "../context/UserContext";
import { useHydration } from "../context/HydrationContext";

import { styled } from "@mui/system";
import Greeting from "./User/Greeting";

/* ICONS */
import { LuGlassWater } from "react-icons/lu";
import { IoWaterOutline } from "react-icons/io5";

/* Semantic Header */
const StyledHeader = styled("header")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px",
  backgroundColor: "#333",
  marginTop: "20px",
  position: "relative",
});

const StyledHeading = styled("h1")({
  color: "var(--main-color)",
  "&:hover": {
    color: "var(--main-color)",
  },
});

const StyledNav = styled("nav")({
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
    color: "#fff",
    textDecoration: "none",
    "&:hover": {
      color: "var(--main-color)",
    },
  },
});

const Header = () => {
  const location = useLocation();

  const { token: authenticated, logout, username } = useUser();
  const { switchUnit, isCup } = useHydration();

  return (
    <StyledHeader>
      {/* Conditionally render icons only on the homepage */}
      {location.pathname === "/" && (
        <>
          {isCup ? (
            <LuGlassWater className="water-icon" onClick={switchUnit} />
          ) : (
            <IoWaterOutline className="water-icon" onClick={switchUnit} />
          )}
        </>
      )}

      <StyledHeading>Hydration Tracker</StyledHeading>
      {username && <Greeting username={username} />}
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
