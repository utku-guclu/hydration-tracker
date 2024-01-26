import React, { useState, useEffect, createContext, useContext } from "react";

const TimerContext = createContext();

const TimerProvider = ({ children, initialTime = 60 * 60 }) => {
    const [time, setTime] = useState(initialTime);
    const [timerRunning, setTimerRunning] = useState(false);

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

    const handleStart = () => {
        setTimerRunning(true);
    };

    const handlePause = () => {
        setTimerRunning(false);
    };

    const handleReset = () => {
        setTime(initialTime);
        setTimerRunning(false);
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${
            remainingSeconds < 10 ? "0" : ""
        }${remainingSeconds}`;
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

export { TimerProvider, useTimer };
