import { styled } from "@mui/system";
import React, { useContext } from "react";

import { ThemeContext } from "../../context/Theme";

const StyledGreeting = styled("p")(({color}) => ({
  color,
  fontSize: "24px",
  fontStyle: "italic",
}));

const Greeting = ({ username }) => {
  const currentHour = new Date().getHours();
  let greeting;

  const { theme } = useContext(ThemeContext);

  if (currentHour >= 5 && currentHour < 12) {
    greeting = "Good morning";
  } else if (currentHour >= 12 && currentHour < 18) {
    greeting = "Good afternoon";
  } else if (currentHour >= 18 && currentHour < 22) {
    greeting = "Good evening";
  } else {
    greeting = "Good night";
  }

  return (
    <StyledGreeting color={theme.greeting}>
      {greeting}, {username}!
    </StyledGreeting>
  );
};

export default Greeting;