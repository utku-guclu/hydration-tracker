import React, { useEffect, useState } from "react";
import { useTimer } from "../../context/TimerContext";

import { styled } from "@mui/system";
import Dialog from "../../context/Dialog";
import SetTimer from "./SetTimer";

import { Tooltip } from "react-tooltip";

const TimerHeading = styled("h2")(({ color }) => ({
  color: color,
  cursor: "pointer",
  display: "inline",
}));

const Timer = () => {
  const [headingColor, setHeadingColor] = useState("#333");
  const [drinkWater, setDrinkWater] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State to control dialog visibility

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
      setHeadingColor("var(--main-color)");
    } else {
      setHeadingColor("#333");
    }
  }, [time]);

  // Function to handle opening the dialog
  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  return (
    <section id="timer" style={{ marginBottom: "100px" }}>
      {/* TimerHeading is now clickable */}
      {!timerRunning && <Tooltip id="timer-tooltip" />}
      <TimerHeading
        data-tooltip-id="timer-tooltip"
        data-tooltip-content="Set Timer!"
        className="timer"
        color={headingColor}
        onClick={handleDialogOpen} // Open dialog on click
      >
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

      {/* Dialog component, conditionally rendered based on isDialogOpen state */}
      <Dialog visible={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <h3>Set Timer</h3>
        <SetTimer />
      </Dialog>
    </section>
  );
};

export default Timer;
