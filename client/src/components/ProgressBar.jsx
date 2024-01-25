import React from "react";
import { useHydration } from "../context/HydrationContext";

function ProgressBar() {
  const { totalIntake } = useHydration();
  const maxGoal = 2000;

  return (
    <div>
      <div style={{ marginTop: "10px" }}>
        <progress value={totalIntake} max={maxGoal}></progress>
        <p>{`${totalIntake} ml / ${maxGoal} ml`}</p>
      </div>
    </div>
  );
}

export default ProgressBar;
