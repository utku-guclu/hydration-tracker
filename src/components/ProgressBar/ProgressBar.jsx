import React from "react";
import MaxGoalInput from "../Hydration/MaxGoalInput";

function ProgressBar({ convertedDailyGoal, unit, convertedTotal }) {
  return (
    <div>
      <MaxGoalInput unit={unit} />
      <div style={{ marginTop: "10px" }}>
        <progress value={convertedTotal} max={convertedDailyGoal}></progress>
        <p className="italic progress-info">{`${convertedTotal} / ${convertedDailyGoal} ${unit}`}</p>
      </div>

      {/* Check if max goal is reached and show a prompt */}
      {convertedTotal >= convertedDailyGoal && (
        <p>{"You've reached your daily hydration goal!"}</p>
      )}
    </div>
  );
}

export default ProgressBar;
