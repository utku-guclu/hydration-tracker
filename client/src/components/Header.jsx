import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledHeader = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2em;
  align-items: center;
  padding: 10px;
  background-color: #333;
`;

const StyledHeading = styled.h1`
  color: #646cff;
`;

const StyledNav = styled.nav`
  ul {
    list-style: none;
    display: flex;
    gap: 20px;
  }

  li {
    font-size: 18px;
  }

  a {
    color: #fff;
    text-decoration: none;
    &:hover {
      color: #646cff;
    }
  }
`;

const Header = () => {
  return (
    <StyledHeader>
      <StyledHeading>Hydration Tracker</StyledHeading>
      <StyledNav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </ul>
      </StyledNav>
    </StyledHeader>
  );
};

export default Header;
