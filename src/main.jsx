import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { HydrationProvider } from "./context/HydrationContext.jsx";
import { TimerProvider } from "./context/TimerContext.jsx";
import { UserProvider } from "./context/UserContext.jsx";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import ThemeProvider from "./context/Theme.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <DndProvider backend={HTML5Backend}>
      <ThemeProvider>
        <UserProvider>
          <TimerProvider>
            <HydrationProvider>
              <App />
            </HydrationProvider>
          </TimerProvider>
        </UserProvider>
      </ThemeProvider>
    </DndProvider>
  </React.StrictMode>
);
