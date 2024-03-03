import React, { useState, useContext } from "react";
import { useHydration } from "../../../context/HydrationContext";

import { ThemeContext } from "../../../context/Theme";

function MaxGoalInput({ unit }) {
  const { updateDailyGoal, convertedDailyGoal } = useHydration();
  const [newMaxGoal, setNewMaxGoal] = useState("");

  const { theme } = useContext(ThemeContext);

  const handleInputChange = (e) => {
    setNewMaxGoal(e.target.value);
  };

  const handleUpdateGoal = (e) => {
    e.preventDefault();

    if (newMaxGoal !== "" && !isNaN(newMaxGoal)) {
      updateDailyGoal(parseInt(newMaxGoal, 10));
      setNewMaxGoal("");
    }
  };

  return (
    <form onSubmit={handleUpdateGoal}>
      <label htmlFor="dailyGoal">
        <span style={{ color: "var(--light)" }}>Daily Goal:</span>
        <input
          placeholder={`${convertedDailyGoal} ${unit}`}
          type="number"
          id="dailyGoal"
          name="dailyGoal"
          value={newMaxGoal}
          onChange={handleInputChange}
          min="0"
        />
      </label>
      <button disabled={!newMaxGoal} type="submit">
        Update Goal
      </button>
    </form>
  );
}

export default MaxGoalInput;
