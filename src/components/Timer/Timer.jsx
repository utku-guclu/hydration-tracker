import React, { useEffect, useState } from "react";
import { useTimer } from "../../context/TimerContext";

import { styled } from "@mui/system";
import Dialog from "../../context/Dialog";
import SetTimer from "./SetTimer";

import { Tooltip } from "react-tooltip";

import { IoPlay, IoPause } from "react-icons/io5";
import { VscDebugRestart } from "react-icons/vsc";

const TimerHeading = styled("h2")(({ color }) => ({
  color: color,
  cursor: "pointer",
  display: "inline",
}));

const TimerSetting = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "2em",
  marginTop: "20px",
  backgroundColor: "#333",
  padding: "1em",
}));

const TimerButtons = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const TimerDigits = styled("div")(() => ({
  fontSize: "30px",
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
      handlePause();
    } else {
      setDrinkWater(false);
    }
  }, [time]);

  useEffect(() => {
    if (timerRunning) {
      setHeadingColor("var(--water)");
    } else {
      setHeadingColor("#333");
    }
  }, [timerRunning]);

  // Function to handle opening the dialog
  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
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
      <TimerSetting>
        <TimerDigits className="time">{formatTime(time)}</TimerDigits>
        <TimerButtons>
          {!timerRunning && time !== 0 ? (
            <IoPlay className="timer-button" onClick={handleStart}>
              Start
            </IoPlay>
          ) : (
            <IoPause className="timer-button" onClick={handlePause}>
              Pause
            </IoPause>
          )}
          <VscDebugRestart className="timer-button" onClick={handleReset}>
            Reset
          </VscDebugRestart>
        </TimerButtons>
      </TimerSetting>
      {drinkWater && (
        <p style={{ color: "var(--water)" }}>It's time to drink water!</p>
      )}

      {/* Dialog component, conditionally rendered based on isDialogOpen state */}
      <Dialog visible={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <h3>Set Timer</h3>
        <SetTimer
          handleDialogClose={handleDialogClose}
          isDialogOpen={isDialogOpen}
        />
      </Dialog>
    </>
  );
};

export default Timer;
