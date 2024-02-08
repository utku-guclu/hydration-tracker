import React from "react";
import { Link, useLocation } from "react-router-dom";
import { styled } from "@mui/system";

/* Semantic Header */
const StyledHeader = styled('header')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px',
  backgroundColor: '#333',
});

const StyledHeading = styled('h1')({
  color: '#646cff',
});

const StyledNav = styled('nav')({
  ul: {
    listStyle: 'none',
    display: 'flex',
    gap: '20px',
  },
  li: {
    fontSize: '18px',
  },
  a: {
    color: '#fff',
    textDecoration: 'none',
    '&:hover': {
      color: '#646cff',
    },
  },
});

const Header = () => {
  const location = useLocation();

  return (
    <StyledHeader>
      <StyledHeading>Hydration Tracker</StyledHeading>
      <StyledNav>
        <ul>
          {/* Render the "Home" link only if not on the home page */}
          {location.pathname !== "/" && (
            <li>
              <Link to="/">Home</Link>
            </li>
          )}
          {/* Render the "Login" link only if not on the login page */}
          {location.pathname !== "/login" && (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
          {/* Render the "Register" link only if not on the register page */}
          {location.pathname !== "/register" && (
            <li>
              <Link to="/register">Register</Link>
            </li>
          )}
        </ul>
      </StyledNav>
    </StyledHeader>
  );
};

export default Header;
