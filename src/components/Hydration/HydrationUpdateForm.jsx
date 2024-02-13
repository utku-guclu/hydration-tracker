import React, { useState } from "react";

import { useHydration } from "../../context/HydrationContext";

function HydrationUpdateForm({ log, onUpdate }) {
  const { intake, timestamp } = log;
  const [updatedIntake, setUpdatedIntake] = useState(intake);

  const { updateHydrationLog } = useHydration();

  const handleUpdate = () => {
    updateHydrationLog(timestamp, updatedIntake);
    onUpdate();
  };

  return (
    <div>
      <label htmlFor="updatedIntake">
        <span>Updated Intake:</span>
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
