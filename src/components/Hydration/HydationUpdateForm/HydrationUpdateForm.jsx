import React, { useState, useRef, useEffect } from "react";

import { useHydration } from "../../../context/HydrationContext";

import { mlToCups } from "hydration-converter";

function HydrationUpdateForm({ log, onUpdate, isDialogOpen }) {
  const { updateHydrationLog, unit, isCup } = useHydration();

  let { intake, timestamp } = log;

  intake = isCup ? mlToCups(intake) : intake;

  const [updatedIntake, setUpdatedIntake] = useState(intake);

  const inputRef = useRef();

  const placeholderText = `Intake ${unit}`;

  useEffect(() => {
    inputRef.current.focus();
  }, [isDialogOpen]);

  const handleUpdate = () => {
    updateHydrationLog(timestamp, updatedIntake);
    onUpdate();
  };

  const handleInputFocus = () => {
    if (updatedIntake === 0) {
      setUpdatedIntake("");
    }
  };

  const handleInputBlur = () => {
    if (updatedIntake === "") {
      setUpdatedIntake(0);
    }
  };

  const handleChange = (e) => {
    setUpdatedIntake(parseInt(e.target.value, 10));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdate();
  };

  return (
    <form onSubmit={handleSubmit} style={{ margin: 0, padding: 0 }}>
      <label
        htmlFor="updatedIntake"
        style={{ backgroundColor: "var(--dark)", width: "100%", margin: 0 }}
      >
        <input
          style={{ backgroundColor: "var(--gray)", paddingLeft: "5px" }}
          ref={inputRef}
          type="number"
          min="0"
          id="updatedIntake"
          name="updatedIntake"
          value={updatedIntake}
          onChange={handleChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          placeholder={placeholderText}
        />
      </label>
      <button
        style={{ width: "100%", margin: 0 }}
        disabled={updatedIntake === 0 || updatedIntake === ""}
      >
        Update Log
      </button>
    </form>
  );
}

export default HydrationUpdateForm;
