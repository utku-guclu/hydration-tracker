import React, { useState } from "react";
import { useHydration } from "../../context/HydrationContext";

function MaxGoalInput({ unit }) {
  const { updateDailyGoal, convertedDailyGoal } = useHydration();
  const [newMaxGoal, setNewMaxGoal] = useState("");

  const handleInputChange = (e) => {
    setNewMaxGoal(e.target.value);
  };

  const handleUpdateGoal = () => {
    if (newMaxGoal !== "" && !isNaN(newMaxGoal)) {
      updateDailyGoal(parseInt(newMaxGoal, 10));
      setNewMaxGoal("");
    }
  };

  return (
    <div className="goal-container">
      <label>
        <span>Daily Goal:</span>
        <input
          placeholder={`${convertedDailyGoal} ${unit}`}
          type="number"
          value={newMaxGoal}
          onChange={handleInputChange}
        />
      </label>
      <button onClick={handleUpdateGoal} disabled={!newMaxGoal}>
        Update Goal
      </button>
    </div>
  );
}

export default MaxGoalInput;
