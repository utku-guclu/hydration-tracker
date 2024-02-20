import { useEffect, useState, useRef } from "react";
import styled from "@emotion/styled";

import { useHydration } from "../../context/HydrationContext";
import { useTimer } from "../../context/TimerContext";

import { cupsToMl } from "hydration-converter";

import waterDrop from "../../assets/water-drop.mp3";

const Bubble = styled("div")(({ filledPercentage }) => ({
  width: "30px",
  height: "30px",
  position: "absolute",
  borderRadius: "50%",
  top: `calc(-${filledPercentage}% + 155px)`, // Adjusted top position based on filledPercentage
  right: "calc(50% - 15px)",
  backgroundColor: "rgba(255, 255, 255, 0.7)",
  boxShadow: `${
    filledPercentage === 100 ? "0 0 10px rgba(255, 255, 255, 0.7)" : ""
  }`,
  animation: "float 3s ease-in-out infinite",
  zIndex: "1",
  cursor: "pointer",
  "@keyframes float": {
    "0%": {
      transform: "translateY(-5px)",
    },
    "50%": {
      transform: "translateY(-10px)",
    },
    "100%": {
      transform: "translateY(-5px)",
    },
  },
}));

const BottleContainer = styled("div")(({ filledPercentage }) => ({
  height: "10rem",
  width: "100%",
  position: "relative",
  outline: "0",
  overflow: "hidden",
  backgroundColor: "var(--water)",
  "&::before": {
    position: "absolute",
    content: '""',
    height: `100%`,
    width: "200%",
    bottom: "-100%",
    left: "-50%",
    borderRadius: "0%",
    background: "var(--ocean)",
    transform: `translateY(calc(-${filledPercentage}%)) rotate(0)`,
    animation: "rise 3s ease-in-out",
  },
  "@keyframes rise": {
    "0%": {
      transform: `translateY(0) rotate(0)`,
    },
    "100%": {
      transform: `translateY(-${filledPercentage}%) rotate(0)`,
    },
  },
}));

function Bottle({ convertedTotal, convertedDailyGoal }) {
  const [filledPercentage, setFilledPercentage] = useState(0);

  const { addHydrationLog, isCup } = useHydration();
  const {handleReset, handleStart} = useTimer();

  const audioRef = useRef(null);

  const clickSound = () => {
    audioRef.current.play();
  };

  useEffect(() => {
    // Calculate the percentage of water filled in the bottle
    const percentage = (convertedTotal / convertedDailyGoal) * 100;
    percentage
      ? setFilledPercentage(percentage < 100 ? percentage : 100)
      : setFilledPercentage(0);
  }, [convertedTotal, convertedDailyGoal]);

  const handleBubbleClick = () => {
    // When the bubble is clicked, add 1 cup
    const waterAmount = isCup ? 1 : cupsToMl(1);
    addHydrationLog(waterAmount);
    clickSound();
    handleReset();
    handleStart();
  };

  return (
    <BottleContainer className="bottle" filledPercentage={filledPercentage}>
      <audio ref={audioRef} src={waterDrop} />
      {/* Bubble component */}
      <Bubble filledPercentage={filledPercentage} onClick={handleBubbleClick} />
    </BottleContainer>
  );
}

export default Bottle;
