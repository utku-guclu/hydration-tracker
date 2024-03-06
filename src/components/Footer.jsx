import React, { useState, useEffect, useContext } from "react";

import { FaArrowCircleUp } from "react-icons/fa";

import { ThemeContext } from "../context/Theme";

import { styled } from "@mui/system";

/* Semantic Footer */
const StyledFooter = styled("footer")(({ color }) => ({
  left: 0,
  bottom: 0,
  display: "none", // Initially hide the footer
  position: "fixed",
  width: "100%",
  textAlign: "center",
  justifyContent: "center",
  padding: "10px",
  marginTop: "100px",
  backgroundColor: "var(--sea)",
}));

const InnerContainer = styled("div")(({ color }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "1em",
  color,
}));

const FooterText = styled("p")({
  margin: 0, // Remove default margin
});

const Footer = () => {
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate the distance between the bottom of the viewport and the bottom of the document
      const bottomOffset = window.innerHeight + window.scrollY;
      const documentHeight = document.documentElement.scrollHeight;
      const isAtBottom = bottomOffset >= documentHeight;

      // Update the visibility of the footer based on whether the user has scrolled to the bottom
      setIsFooterVisible(isAtBottom);
    };

    // Add event listener for scroll
    window.addEventListener("scroll", handleScroll);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Optionally, add smooth scrolling behavior
    });
  };

  return (
    <StyledFooter style={{ display: isFooterVisible ? "flex" : "none" }}>
      <InnerContainer color={theme.secondaryColor}>
        <FooterText>All rights reserved &copy; Hydration Tracker</FooterText>
        <FaArrowCircleUp
          style={{ fontSize: "20px", cursor: "pointer" }}
          onClick={handleScrollToTop}
        />
      </InnerContainer>
    </StyledFooter>
  );
};

export default Footer;
