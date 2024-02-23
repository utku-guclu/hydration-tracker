import styled from "@emotion/styled";
import React from "react";

const StyledGreeting = styled("p")({
  color: "#df8b46",
  fontSize: "24px",
  fontStyle: "italic",
});

const Greeting = ({ username }) => {
  const currentHour = new Date().getHours();
  let greeting;

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
    <StyledGreeting>
      {greeting}, {username}!
    </StyledGreeting>
  );
};

export default Greeting;
