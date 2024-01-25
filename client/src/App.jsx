import React, { useState } from "react";
import HydrationForm from "./components/HydrationForm";
import HydrationLogs from "./components/HydrationLogs";
import ProgressBar from "./components/ProgressBar";
import "./App.css";
import { HydrationProvider } from "./context/HydrationContext";

function App() {
    const [refreshLogs, setRefreshLogs] = useState(false);
    const handleRefreshLogs = () => {
        setRefreshLogs((prev) => !prev);
    };
    return (
        <HydrationProvider>
            <div>
                <HydrationForm onSubmitSuccess={handleRefreshLogs} />
                <ProgressBar />
                <HydrationLogs key={refreshLogs} />
            </div>
        </HydrationProvider>
    );
}

export default App;
