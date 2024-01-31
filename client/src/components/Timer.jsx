import React, { useEffect } from "react";
import { useTimer } from "../context/TimerContext";

const Timer = () => {
  const {
    time,
    timerRunning,
    handleStart,
    handlePause,
    handleReset,
    formatTime,
  } = useTimer();

  useEffect(() => {
    if (time === 0) {
      // Handle action when timer reaches 0 (e.g., remind to drink water)
      console.log("It's time to drink water!");
    }
  }, [time]);

  return (
    <div>
      <h2>Timer</h2>
      <p>
        Remaining Time: <span className="time">{formatTime(time)}</span>
      </p>
      {time === 0 && <p>It's time to drink water!</p>}
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
