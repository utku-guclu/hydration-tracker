import React, { useState } from "react";

import { useHydration } from "../../context/HydrationContext";

import { mlToCups } from "hydration-converter";

function HydrationUpdateForm({ log, onUpdate }) {
  const { updateHydrationLog, unit, convertedTotal, isCup } = useHydration();

  let { intake, timestamp } = log;

  intake = isCup ? mlToCups(intake) : intake;

  const [updatedIntake, setUpdatedIntake] = useState(intake);

  const handleUpdate = () => {
    updateHydrationLog(timestamp, updatedIntake);
    onUpdate();
  };

  return (
    <div>
      <label htmlFor="updatedIntake">
        <span>Updated Intake {unit}:</span>
        <input
          type="number"
          id="updatedIntake"
          name="updatedIntake"
          value={updatedIntake}
          onChange={(e) => setUpdatedIntake(parseInt(e.target.value, 10))}
        />
      </label>
      <button
        style={{ width: "100%", marginTop: "6px" }}
        disabled={updatedIntake === 0 || updatedIntake === ""}
        onClick={handleUpdate}
      >
        Update Log
      </button>
    </div>
  );
}

export default HydrationUpdateForm;
