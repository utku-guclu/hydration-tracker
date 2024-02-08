import React, { useEffect, useState } from "react";
import { useTimer } from "../../context/TimerContext";

import { styled } from "@mui/system";

const TimerHeading = styled("h2")(({ color }) => ({
  color: color,
}));

const Timer = () => {
  const [headingColor, setHeadingColor] = useState("#333");
  const [drinkWater, setDrinkWater] = useState(false);

  const {
    time,
    timerRunning,
    handleStart,
    handlePause,
    handleReset,
    formatTime,
  } = useTimer();

  useEffect(() => {
    // Handle action when timer reaches 0 (e.g., remind to drink water)
    if (time === 0) {
      setDrinkWater(true);
    } else {
      setDrinkWater(false);
    }
  }, [time]);

  useEffect(() => {
    if (timerRunning) {
      setHeadingColor("#646cff");
    } else {
      setHeadingColor("#333");
    }
  }, [time]);

  return (
    <div>
      <TimerHeading className="timer" color={headingColor}>
        Timer
      </TimerHeading>
      <p>
        Remaining Time: <span className="time">{formatTime(time)}</span>
      </p>
      {drinkWater && <p>It's time to drink water!</p>}
      <button onClick={handleStart} disabled={timerRunning}>
        Start
      </button>
      <button onClick={handlePause} disabled={!timerRunning}>
        Pause
      </button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
};

export default Timer;