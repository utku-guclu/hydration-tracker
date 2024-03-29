import React, { useState, useContext } from "react";
import { useHydration } from "../../../context/HydrationContext";

import { ThemeContext } from "../../../context/Theme";
import UnitTexField from "../../UI/UnitTextField";

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
    <form
      style={{ backgroundColor: theme.alternativeBackgroundColor }}
      onSubmit={handleUpdateGoal}
    >
      <UnitTexField
        label="Daily Goal"
        placeholder={`${convertedDailyGoal}`}
        type="number"
        id="dailyGoal"
        name="dailyGoal"
        value={newMaxGoal}
        onChange={handleInputChange}
        min="0"
        unit={unit}
      />

      <button disabled={!newMaxGoal} type="submit">
        Update Goal
      </button>
    </form>
  );
}

export default MaxGoalInput;
