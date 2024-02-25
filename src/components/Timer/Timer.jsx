import React, { useEffect, useState, useContext, useRef } from "react";
import { useTimer } from "../../context/TimerContext";

import Dialog from "../../context/Dialog";
import SetTimer from "./SetTimer";

import { Tooltip } from "react-tooltip";

import { IoPlay, IoPause } from "react-icons/io5";
import { VscDebugRestart } from "react-icons/vsc";

import { ThemeContext } from "../../context/Theme";

import clockAlarm from "../../assets/sounds/clock-alarm.mp3";

import {
  TimerHeading,
  TimerSetting,
  TimerDigits,
  TimerButtons,
} from "./Timer.style";

const Timer = () => {
  const [headingColor, setHeadingColor] = useState("var(--gray)");
  const [drinkWater, setDrinkWater] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State to control dialog visibility

  const { theme } = useContext(ThemeContext);

  const clockAlarmRef = useRef(null);

  const alarmSound = () => {
    clockAlarmRef.current.play();
  };

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
      alarmSound();
      setDrinkWater(true);
      handlePause();
    } else {
      setDrinkWater(false);
    }
  }, [time]);

  useEffect(() => {
    if (timerRunning) {
      setHeadingColor(theme.color);
    } else {
      setHeadingColor("var(--gray)");
    }
  }, [timerRunning, theme.color]);

  // Function to handle opening the dialog
  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <audio ref={clockAlarmRef} src={clockAlarm} />
      {/* TimerHeading is now clickable */}
      {!timerRunning && <Tooltip id="timer-tooltip" />}
      <TimerHeading
        data-tooltip-id="timer-tooltip"
        data-tooltip-content="Set Timer!"
        className="timer-heading"
        color={headingColor}
        onClick={handleDialogOpen} // Open dialog on click
      >
        Timer
      </TimerHeading>
      <TimerSetting color={theme.text}>
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
        <p style={{ color: theme.color }}>It's time to drink water!</p>
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