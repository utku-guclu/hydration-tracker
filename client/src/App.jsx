import React, { useEffect, useState } from "react";
import HydrationForm from "./components/HydrationForm";
import HydrationLogs from "./components/HydrationLogs";
import ProgressBar from "./components/ProgressBar";
import "./App.css";
import Timer from "./components/Timer";
import { useTimer } from "./context/TimerContext";

function App() {
    const { handleReset, handleStart } = useTimer();
    const [refreshLogs, setRefreshLogs] = useState(false);

    const handleRefreshLogs = () => {
        // Reset the timer when logging water intake and start again
        handleReset();
        handleStart();
        setRefreshLogs((prev) => !prev);
    };

    return (
        <div>
            <HydrationForm onSubmitSuccess={handleRefreshLogs} />
            <ProgressBar />
            <HydrationLogs key={refreshLogs} />
            <Timer />
        </div>
    );
}

export default App;
