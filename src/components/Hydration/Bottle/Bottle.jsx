import { useEffect, useState, useRef } from "react";
import styled from "@emotion/styled";

import { useHydration } from "../../../context/HydrationContext";
import { useTimer } from "../../../context/TimerContext";

import { cupsToMl } from "hydration-converter";

import waterDrop from "../../../assets/sounds/water-drop.mp3";

import { Bubble, BottleContainer } from "./Bottle.style";

function Bottle({ convertedTotal, convertedDailyGoal }) {
  const [filledPercentage, setFilledPercentage] = useState(0);

  const { addHydrationLog, isCup } = useHydration();
  const { handleReset, handleStart } = useTimer();

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
