import React from "react";
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

const Footer = () => {
  return (
    <StyledFooter>
      <FooterText>All rights reserved &copy; Hydration Tracker</FooterText>
    </StyledFooter>
  );
};

export default Footer;
