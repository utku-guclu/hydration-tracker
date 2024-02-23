import { useContext } from "react";
import { useHydration } from "../../context/HydrationContext";

import Bottle from "../Hydration/Bottle";

import { ThemeContext } from "../../context/Theme";

import { styled } from "@mui/system";

const ProgressInfoLabel = styled("p")(({ color }) => ({
  color: color,
}));

function ProgressBar() {
  const { convertedTotal, unit, convertedDailyGoal } = useHydration();
  const { theme } = useContext(ThemeContext);

  return (
    <>
      <div style={{ marginTop: "10px" }}>
        {/* <progress value={convertedTotal} max={convertedDailyGoal}></progress> */}
        <Bottle
          convertedTotal={convertedTotal}
          convertedDailyGoal={convertedDailyGoal}
        ></Bottle>
        <ProgressInfoLabel
          color={theme.color}
          className="italic progress-info"
        >{`${convertedTotal} / ${convertedDailyGoal} ${unit}`}</ProgressInfoLabel>
      </div>

      {/* Check if max goal is reached and show a prompt */}
      {convertedTotal !== 0 && convertedTotal >= convertedDailyGoal && (
        <p
          style={{
            color: "var(--secondary-color)",
            textSshadow: "1px 1px 1px var(--dark)",
          }}
        >
          {"You've reached your daily hydration goal!"}
        </p>
      )}
    </>
  );
}

export default ProgressBar;
