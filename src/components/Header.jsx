import React from "react";
import { Link, useLocation } from "react-router-dom";

import { styled } from "@mui/system";

import Logout from "./User/Logout";
import { HydrationUnitLogo } from "./Hydration/HydrationUnitLogo";

/* Hooks */
import { useUser } from "../context/UserContext";

/* Semantic Header */
const StyledHeader = styled("header")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px 0 0",
  backgroundColor: "var(--gray)",
  position: "relative",
}));

const StyledHeading = styled("h1")({
  margin: "20px 10px 10px",
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

const NavItem = styled("li")({
  textTransform: "uppercase",
});

const NavItems = styled("ul")({});

const UserProfile = styled("li")({
  display: "flex",
  alignItems: "center",
});

const UserLogo = styled("img")({
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  marginRight: "10px",
});

const Header = ({ children }) => {
  const location = useLocation();

  const {
    token: authenticated,
    logout,
    lastName,
    username,
    picture,
  } = useUser();

  return (
    <StyledHeader>
      <StyledHeading>Hydration Tracker</StyledHeading>
      {children}
      {location.pathname === "/" && <HydrationUnitLogo />}

      <StyledNav>
        <NavItems>
          {/* Render the "Home" link only if not on the home page */}
          {location.pathname !== "/" && (
            <NavItem>
              <Link to="/">Home</Link>
            </NavItem>
          )}
          {/* Render the "Login" link only if not on the login page and user is not logged in */}
          {location.pathname !== "/login" && !authenticated && (
            <NavItem>
              <Link to="/login">Login</Link>
            </NavItem>
          )}
          {/* Render the "Register" link only if not on the register page and user is not logged in */}
          {location.pathname !== "/register" && !authenticated && (
            <NavItem>
              <Link to="/register">Register</Link>
            </NavItem>
          )}
          {/* Render the "Logout" link only if user is logged in */}
          {authenticated && (
            <UserProfile>
              {picture && (
                <UserLogo src={picture} alt={`${username} ${lastName}`} />
              )}
              <Logout logout={logout}>Logout</Logout>
            </UserProfile>
          )}
        </NavItems>
      </StyledNav>
    </StyledHeader>
  );
};

export default Header;
