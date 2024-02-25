import React, { useEffect, useState, useContext } from "react";

import { useHydration } from "../../../context/HydrationContext";
import { useTimer } from "../../../context/TimerContext";
import { ThemeContext } from "../../../context/Theme";
import { useUser } from "../../../context/UserContext";

import { styled } from "@mui/system";
import MaxGoalInput from "../MaxGoalnput/MaxGoalInput";

import { addHydrationLog } from "../../../services/hydrationService";

const WaterIntakeHeading = styled("h2")(({ color }) => ({
  color,
}));

function HydrationForm() {
  const { token } = useUser();
  const { unit, isCup, setRecentIntake, setLogs, updateCall, dailyGoal } =
    useHydration();
  const { handleStart, handleReset } = useTimer();

  const [headingColor, setHeadingColor] = useState("var(--gray)");
  const [waterIntakeLocal, setWaterIntakeLocal] = useState(0);

  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    if (waterIntakeLocal) {
      setHeadingColor("var(--ocean)");
    } else {
      setHeadingColor("var(--gray)");
    }
  }, [waterIntakeLocal]);

  const handleInputFocus = () => {
    if (waterIntakeLocal === 0) {
      setWaterIntakeLocal("");
    }
  };

  const handleInputBlur = () => {
    if (waterIntakeLocal === "") {
      setWaterIntakeLocal(0);
    }
  };

  const handleInputChange = (e) => {
    setWaterIntakeLocal(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    handleReset();
    handleStart();
    setWaterIntakeLocal(0);
    if (waterIntakeLocal <= 0 || waterIntakeLocal === "") return;

    addHydrationLog(
      token,
      waterIntakeLocal,
      dailyGoal,
      isCup,
      setRecentIntake,
      setLogs,
      updateCall
    );
  };

  return (
    <>
      <WaterIntakeHeading className="water-intake-heading" color={headingColor}>
        Log Your Water Intake
      </WaterIntakeHeading>
      <form id="log-submit-form" onSubmit={handleFormSubmit}>
        <label htmlFor="waterIntake">
          <span style={{ color: theme.text }}>Water {unit}:</span>
          <input
            placeholder={waterIntakeLocal}
            type="number"
            id="waterIntake"
            name="waterIntake"
            value={waterIntakeLocal}
            min="0"
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
          />
        </label>
        <button disabled={!waterIntakeLocal} type="submit">
          Log Water Intake
        </button>
      </form>
      <MaxGoalInput unit={unit} />
    </>
  );
}

export default HydrationForm;
