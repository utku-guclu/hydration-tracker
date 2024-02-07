import React, { useEffect, useState } from "react";

import { styled } from "@mui/system";

const WaterIntakeHeading = styled("h2")(({ color }) => ({
  color: color,
}));

function HydrationForm({ onSubmitSuccess }) {
  const [headingColor, setHeadingColor] = useState("#333");

  const [waterIntakeLocal, setWaterIntakeLocal] = useState(0);

  useEffect(() => {
    if (waterIntakeLocal) {
      setHeadingColor("#646cff");
    } else {
      setHeadingColor("#333");
    }
  }, [waterIntakeLocal]);

  const handleFormSubmit = async (e) => {
    if (waterIntakeLocal <= 0 || "") return;

    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/hydration/logs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          intake: parseInt(waterIntakeLocal, 10),
        }),
      });

      if (response.ok) {
        console.log("Hydration log added successfully");
        onSubmitSuccess();
      } else {
        console.error("Failed to add hydration log");
      }
    } catch (error) {
      console.error("Error:", error);
    }

    console.log(`Submitted water intake: ${waterIntakeLocal} ml`);
  };

  return (
    <div>
      <WaterIntakeHeading color={headingColor}>
        Log Your Water Intake
      </WaterIntakeHeading>
      <form data-testid="hydration-form" onSubmit={handleFormSubmit}>
        <label htmlFor="waterIntake">
          <span>Water Intake (ml):</span>
          <input
            type="number"
            value={waterIntakeLocal}
            onChange={(e) => setWaterIntakeLocal(e.target.value)}
          />
        </label>
        <button
          disabled={!waterIntakeLocal}
          type="submit"
        >
          Log Water Intake
        </button>
      </form>
    </div>
  );
}

export default HydrationForm;
