import React from "react";
import { styled } from "@mui/system";

/* Semantic Footer */
const StyledFooter = styled("footer")({
  bottom: 0,
  display: "flex",
  width: "100%",
  alignItems: "center",
  justifyContent: "center",
  padding: "10px",
  marginTop: "100px",
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
