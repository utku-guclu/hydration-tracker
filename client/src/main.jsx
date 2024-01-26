import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { HydrationProvider } from "./context/HydrationContext";
import { TimerProvider } from "./context/TimerContext";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <TimerProvider>
            <HydrationProvider>
                <App />
            </HydrationProvider>
        </TimerProvider>
    </React.StrictMode>
);
