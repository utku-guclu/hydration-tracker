// Usage in the parent component
import React, { useState } from "react";
import HydrationForm from "./components/HydrationForm";
import HydrationLogs from "./components/HydrationLogs";
import "./App.css";

function App() {
    const [refreshLogs, setRefreshLogs] = useState(false);

    const handleRefreshLogs = () => {
        setRefreshLogs((prev) => !prev);
    };

    return (
        <div>
            <HydrationForm onSubmitSuccess={handleRefreshLogs} />
            <HydrationLogs key={refreshLogs} />
        </div>
    );
}

export default App;
