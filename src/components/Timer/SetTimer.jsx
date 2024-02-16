import React, { useState, useContext } from "react";
import { TimerContext } from "../../context/TimerContext";

const SetTimer = ({handleDialogClose}) => {
  const { setTimer } = useContext(TimerContext);

  const [inputTime, setInputTime] = useState(60);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputTime !== 0) {
      setTimer(inputTime * 60);
      setInputTime(0);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        min="0"
        type="number"
        value={inputTime}
        onChange={(e) => setInputTime(e.target.value)}
        placeholder="Enter time in minutes"
      />
      <button type="submit" onClick={() => handleDialogClose(false)}>Set Timer</button>
    </form>
  );
};

export default SetTimer;
