import React, { useState, useContext } from "react";
import { TimerContext } from "../../context/TimerContext";

const SetTimer = () => {
  const { setTimer } = useContext(TimerContext);
  const [inputTime, setInputTime] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputTime.trim() !== "") {
      setTimer(Number(inputTime));
      setInputTime("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        value={inputTime}
        onChange={(e) => setInputTime(e.target.value)}
        placeholder="Enter time in minutes"
      />
      <button type="submit">Set Timer</button>
    </form>
  );
};

export default SetTimer;
