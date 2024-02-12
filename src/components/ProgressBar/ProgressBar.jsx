import React from "react";
import MaxGoalInput from "../Hydration/MaxGoalInput";

function ProgressBar({ totalIntake, dailyGoal }) {
  return (
    <div>
      <MaxGoalInput />
      <div style={{ marginTop: "10px" }}>
        <progress value={totalIntake} max={dailyGoal}></progress>
        <p className="italic progress-info">{`${totalIntake} ml / ${dailyGoal} ml`}</p>
      </div>

      {/* Check if max goal is reached and show a prompt */}
      {totalIntake >= dailyGoal && (
        <p>{"You've reached your daily hydration goal!"}</p>
      )}
    </div>
  );
}

export default ProgressBar;
