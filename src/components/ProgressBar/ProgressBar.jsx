import React, { useEffect } from "react";
import Bottle from "../Hydration/Bottle";

function ProgressBar({ convertedDailyGoal, unit, convertedTotal }) {
  return (
    <>
      <div style={{ marginTop: "10px" }}>
        {/* <progress value={convertedTotal} max={convertedDailyGoal}></progress> */}
        <Bottle
          convertedTotal={convertedTotal}
          convertedDailyGoal={convertedDailyGoal}
        ></Bottle>
        <p className="italic progress-info">{`${convertedTotal} / ${convertedDailyGoal} ${unit}`}</p>
      </div>

      {/* Check if max goal is reached and show a prompt */}
      {convertedTotal !== 0 && convertedTotal >= convertedDailyGoal && (
        <p
          style={{
            color: "var(--secondary-color)",
          }}
        >
          {"You've reached your daily hydration goal!"}
        </p>
      )}
    </>
  );
}

export default ProgressBar;
