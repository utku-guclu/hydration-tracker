import React from "react";
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

const Footer = () => {
  return (
    <StyledFooter>
      <FooterText>All rights reserved &copy; Hydration Tracker</FooterText>
    </StyledFooter>
  );
};

export default Footer;
