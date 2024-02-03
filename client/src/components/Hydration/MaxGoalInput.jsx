import React, { useState } from "react";
import { useHydration } from "../../context/HydrationContext";

function MaxGoalInput() {
  const { dailyGoal, updateDailyGoal } = useHydration();
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
        <span>Daily Goal (ml):</span>
        <input
          placeholder={dailyGoal}
          type="number"
          value={newMaxGoal}
          onChange={handleInputChange}
        />
      </label>
      <button onClick={handleUpdateGoal}>Update Goal</button>
    </div>
  );
}

export default MaxGoalInput;
