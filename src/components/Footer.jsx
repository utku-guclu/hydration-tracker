import React from "react";
<<<<<<< HEAD
import { styled } from "@mui/system";

/* Semantic Footer */
const StyledFooter = styled("footer")({
  left: 0,
  bottom: 0,
  display: "flex",
  position: "fixed",
  width: "100%",
  textAlign: "center",
  justifyContent: "center",
  padding: "10px",
  marginTop: "100px",
  backgroundColor: "var(--sea)",
});

const FooterText = styled("p")({
  margin: 0, // Remove default margin
});
=======
import styled from "styled-components";

const StyledFooter = styled.footer`
  position: fixed;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
`;

const FooterText = styled.p`
  margin: 0; /* Remove default margin */
`;
>>>>>>> 290fd59 (vite:conf-github:workflow)

const Footer = () => {
  return (
    <StyledFooter>
      <FooterText>All rights reserved &copy; Hydration Tracker</FooterText>
    </StyledFooter>
  );
};

export default Footer;
