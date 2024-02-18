import React from "react";
import { Link, useLocation } from "react-router-dom";

/* Hooks */
import { useUser } from "../context/UserContext";
import { useHydration } from "../context/HydrationContext";

/* ICONS */
import { LuGlassWater } from "react-icons/lu";
import { IoWaterOutline } from "react-icons/io5";

import { styled } from "@mui/system";

import Logout from "./User/Logout";
import Greeting from "./User/Greeting";

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
  marginBottom: 0,
  color: "var(--ocean)",
  "&:hover": {
    color: "var(--sea)",
  },
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
    color: "#fff",
    textDecoration: "none",
    "&:hover": {
      color: "var(--secondary-color)",
    },
  },
});

const ThirstinessLevel = styled("div")(({ color }) => ({
  color,
  position: "absolute",
  bottom: "10px",
  right: "10px",
  fontStyle: "italic",
}));

const Header = () => {
  const location = useLocation();

  const { token: authenticated, logout, username } = useUser();
  const { switchUnit, isCup, thirstiness, thirstinessColor } = useHydration();

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
      {/* thirstiness level */}
      {location.pathname === "/" && (
        <ThirstinessLevel color={thirstinessColor}>
          {thirstiness}
        </ThirstinessLevel>
      )}
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
