import React, { useState, useEffect, createContext, useContext } from "react";

const TimerContext = createContext();

const TimerProvider = ({ children, initialTime = 60 * 60 }) => {
  // Function to get the initial time from localStorage or use the default initial time
  const getInitialTime = () => {
    const { time: storedTime } = JSON.parse(localStorage.getItem("timerState"));
    return storedTime ? parseInt(storedTime, 10) : initialTime;
  };

  const [time, setTime] = useState(getInitialTime);
  const [timerRunning, setTimerRunning] = useState(false);
  const [adjustedTime, setAdjustedTime] = useState(initialTime);
  const [timeDifference, setTimeDifference] = useState(0);

  // Function to handle starting the timer
  const handleStart = () => {
    setTimerRunning(true);
  };

  // Function to handle pausing the timer
  const handlePause = () => {
    setTimerRunning(false);
  };

  // Function to handle resetting the timer
  const handleReset = () => {
    setTime(initialTime);
    setTimerRunning(false);
  };

  // Function to set the timer to a specific time
  const setTimer = (time) => {
    setTime(time);
    setAdjustedTime(time);
  };

  // Function to calculate the time difference
  const calculateTimeDifference = (time, adjustedTime) => {
    const timeSinceLastDrink = adjustedTime - time;
    return timeSinceLastDrink;
  };

  // Effect to handle timer countdown
  useEffect(() => {
    let timer;

    if (timerRunning) {
      timer = setInterval(() => {
        setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [timerRunning]);

  // Effect to calculate and update the time difference
  useEffect(() => {
    const timeDiff = calculateTimeDifference(time, adjustedTime);
    setTimeDifference(timeDiff);
  }, [time, adjustedTime]);

  // Effect to persist timer state in localStorage
  useEffect(() => {
    localStorage.setItem("timerState", JSON.stringify({ time, timerRunning }));
  }, [time, timerRunning]);

  // Effect to retrieve timer state from localStorage on component mount
  useEffect(() => {
    const storedTimerState = localStorage.getItem("timerState");
    console.log(storedTimerState);
    if (storedTimerState) {
      const { time: storedTime, timerRunning: storedTimerRunning } =
        JSON.parse(storedTimerState);
      setTime(storedTime);
      setTimerRunning(storedTimerRunning);
    }
  }, []);

  // Function to format time
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return (
      <span>
        {minutes}
        <span className={timerRunning ? "blink" : ""}>:</span>
        {remainingSeconds < 10 ? "0" : ""}
        {remainingSeconds}
      </span>
    );
  };

  return (
    <TimerContext.Provider
      value={{
        time,
        timerRunning,
        handleStart,
        handlePause,
        handleReset,
        formatTime,
        setTimer,
        timeDifference,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};

const useTimer = () => {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error("useTimer must be used within a TimerProvider");
  }
  return context;
};

export { TimerProvider, useTimer, TimerContext };
