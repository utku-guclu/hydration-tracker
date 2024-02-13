import React, { useState } from "react";

function HydrationUpdateForm({ log, onUpdate }) {
  const [updatedIntake, setUpdatedIntake] = useState(log.intake);

  const handleUpdate = async () => {
    try {
      // Make a PUT request to update the hydration log
      const response = await fetch(
        `http://localhost:3008/api/hydration-logs/${log.timestamp}`,
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
        // Trigger the parent component's onUpdate callback
        onUpdate();
      } else {
        console.error("Failed to update hydration log");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <label htmlFor="updatedIntake">Updated Intake:</label>
      <input
        type="number"
        id="updatedIntake"
        value={updatedIntake}
        onChange={(e) => setUpdatedIntake(parseInt(e.target.value, 10))}
      />

      <button onClick={handleUpdate}>Update Log</button>
    </div>
  );
}

export default HydrationUpdateForm;
