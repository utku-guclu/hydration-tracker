import React, { useState } from "react";

function HydrationUpdateForm({ log, onUpdate }) {
  const [updatedIntake, setUpdatedIntake] = useState(log.intake);

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/hydration-logs/${log.timestamp}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          intake: updatedIntake,
        }),
      });

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
