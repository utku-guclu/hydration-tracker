import { useEffect, useRef } from "react";
import { useHydration } from "../../context/HydrationContext";

import { Bottle } from "../Hydration/Bottle";

import { styled } from "@mui/system";

import goal from "../../assets/sounds/goal.mp3";

import { ThemeContext } from "../../context/Theme";

const ProgressInfoLabel = styled("p")(({ color }) => ({
  color: window.innerWidth > 600 ? "var(--dark)" : "inherit",
}));

function ProgressBar() {
  const { convertedTotal, unit, convertedDailyGoal } = useHydration();

  const { theme } = useContext(ThemeContext);

  const goalState =
    convertedTotal !== 0 && convertedTotal >= convertedDailyGoal;

  const goalRef = useRef(null);

  const goalSound = () => {
    goalRef.current.play();
  };

  useEffect(() => {
    if (goalState) {
      goalSound();
    }
  }, [goalState]);

  return (
    <>
      <audio ref={goalRef} src={goal} />
      <div style={{ marginTop: "10px" }}>
        {/* <progress value={convertedTotal} max={convertedDailyGoal}></progress> */}
        <Bottle
          convertedTotal={convertedTotal}
          convertedDailyGoal={convertedDailyGoal}
        ></Bottle>
        <ProgressInfoLabel className="italic progress-info">{`${convertedTotal} / ${convertedDailyGoal} ${unit}`}</ProgressInfoLabel>
      </div>

      {/* Check if max goal is reached and show a prompt */}
      {goalState && (
        <p
          style={{
            color: theme.label,
          }}
        >
          {"You've reached your daily hydration goal!"}
        </p>
      )}
    </>
  );
}

export default ProgressBar;
