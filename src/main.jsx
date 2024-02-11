import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { HydrationProvider } from "./context/HydrationContext.jsx";
import { TimerProvider } from "./context/TimerContext.jsx";
import { UserProvider } from "./context/UserContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <TimerProvider>
        <HydrationProvider>
          <App />
        </HydrationProvider>
      </TimerProvider>
    </UserProvider>
  </React.StrictMode>
);
