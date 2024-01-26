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

            {/* Check if max goal is reached and show a prompt */}
            {totalIntake >= maxGoal && (
                <p>{"You've reached your daily hydration goal!"}</p>
            )}
        </div>
    );
}

export default ProgressBar;
