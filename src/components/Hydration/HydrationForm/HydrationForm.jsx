import React, { useEffect, useState, useContext } from "react";

import { useHydration } from "../../../context/HydrationContext";
import { useTimer } from "../../../context/TimerContext";
import { ThemeContext } from "../../../context/Theme";
import { useUser } from "../../../context/UserContext";

import { styled } from "@mui/system";
import MaxGoalInput from "../MaxGoalnput/MaxGoalInput";

import { addHydrationLog } from "../../../services/hydrationService";
import UnitTexField from "../../UI/UnitTextField";

import { mlToCups } from "hydration-converter";

const WaterIntakeHeading = styled("h2")(({ color }) => ({
  color,
}));

function HydrationForm() {
  const { token } = useUser();
  const {
    unit,
    isCup,
    setRecentIntake,
    setLogs,
    updateCall,
    dailyGoal,
    recentIntake,
  } = useHydration();
  const { handleStart, handleReset } = useTimer();

  const [headingColor, setHeadingColor] = useState("var(--gray)");
  const [waterIntakeLocal, setWaterIntakeLocal] = useState("");

  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    if (waterIntakeLocal) {
      setHeadingColor("var(--ocean)");
    } else {
      setHeadingColor("var(--gray)");
    }
  }, [waterIntakeLocal]);

  // const handleInputFocus = () => {
  //   if (waterIntakeLocal === 0) {
  //     setWaterIntakeLocal("");
  //   }
  // };

  // const handleInputBlur = () => {
  //   if (waterIntakeLocal === "") {
  //     setWaterIntakeLocal(""); // use "" instead of 0
  //   }
  // };

  const handleInputChange = (e) => {
    setWaterIntakeLocal(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    handleReset();
    handleStart();
    setWaterIntakeLocal("");
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
      <form
        className="hydration-submit-form"
        onSubmit={handleFormSubmit}
        style={{ backgroundColor: theme.alternativeBackgroundColor }}
      >
        <UnitTexField
          label="Water Intake"
          unit={unit}
          placeholder={isCup ? mlToCups(recentIntake) : recentIntake}
          type="number"
          id="waterIntake"
          name="waterIntake"
          value={waterIntakeLocal}
          min="0"
          onChange={handleInputChange}
          // onFocus={handleInputFocus}
          // onBlur={handleInputBlur}
        />
        <button
          disabled={!waterIntakeLocal}
          type="submit"
        >
          Log Water Intake
        </button>
      </form>
      <MaxGoalInput unit={unit} />
    </>
  );
}

export default HydrationForm;
