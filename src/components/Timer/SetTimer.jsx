import React, { useState, useContext, useRef, useEffect } from "react";
import { TimerContext } from "../../context/TimerContext";

const SetTimer = ({ handleDialogClose, isDialogOpen }) => {
  const { setTimer } = useContext(TimerContext);

  const [inputTime, setInputTime] = useState(60);

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, [isDialogOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputTime !== 0) {
      setTimer(inputTime * 60);
      setInputTime(0);
      handleDialogClose(false);
    }
  };

  const handleInputFocus = () => {
    if (inputTime === 0) {
      setInputTime("");
    }
  };

  const handleInputBlur = () => {
    if (inputTime === "") {
      setInputTime(0);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        min="0"
        type="number"
        value={inputTime}
        onChange={(e) => setInputTime(e.target.value)}
        placeholder="Enter time in minutes"
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
      />
      <button type="submit">Set Timer</button>
    </form>
  );
};

export default SetTimer;
