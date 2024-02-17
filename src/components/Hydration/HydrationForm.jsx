import React, { useEffect, useState } from "react";
import { styled } from "@mui/system";

import { useHydration } from "../../context/HydrationContext";
import { useTimer } from "../../context/TimerContext";

const WaterIntakeHeading = styled("h2")(({ color }) => ({
  color: color,
}));

function HydrationForm() {
  const { addHydrationLog, unit } = useHydration();
  const { handleStart, handleReset } = useTimer();
  const [headingColor, setHeadingColor] = useState("#333");
  const [waterIntakeLocal, setWaterIntakeLocal] = useState(0);

  useEffect(() => {
    if (waterIntakeLocal) {
      setHeadingColor("var(--main-color)");
    } else {
      setHeadingColor("#333");
    }
  }, [waterIntakeLocal]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    handleReset();
    handleStart();
    setWaterIntakeLocal(0);
    if (waterIntakeLocal <= 0 || waterIntakeLocal === "") return;

    try {
      await addHydrationLog(parseInt(waterIntakeLocal, 10));
      console.log("Hydration log added successfully");
    } catch (error) {
      console.error("Failed to add hydration log", error);
    }
    console.log(`Submitted water intake: ${waterIntakeLocal} ${unit}`);
  };

  return (
    <>
      <WaterIntakeHeading color={headingColor}>
        Log Your Water Intake
      </WaterIntakeHeading>
      <form data-testid="hydration-form" onSubmit={handleFormSubmit}>
        <label htmlFor="waterIntake">
          <span>Water {unit}:</span>
          <input
            placeholder={waterIntakeLocal}
            type="number"
            id="waterIntake"
            name="waterIntake"
            value={waterIntakeLocal}
            min="0"
            onChange={(e) => setWaterIntakeLocal(e.target.value)}
          />
        </label>
        <button disabled={!waterIntakeLocal} type="submit">
          Log Water Intake
        </button>
      </form>
    </>
  );
}

export default HydrationForm;
