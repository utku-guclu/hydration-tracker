import React, { useState } from "react";

import server from "../../config/baseURL";

function HydrationUpdateForm({ log, onUpdate }) {
  const [updatedIntake, setUpdatedIntake] = useState(log.intake);

  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `${server}/api/hydration/logs/${log.timestamp}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            intake: updatedIntake,
          }),
        }
      );

      if (response.ok) {
        onUpdate(); // Call the callback to trigger updates in the parent component
      } else {
        console.error("Failed to update hydration log");
      }
    } catch (error) {
      console.error("Error:", error);
    }
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
