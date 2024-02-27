import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

import { HydrationProvider } from "./context/HydrationContext.jsx";
import { TimerProvider } from "./context/TimerContext.jsx";
import { UserProvider } from "./context/UserContext.jsx";

import ThemeProvider from "./context/Theme.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider>
    <React.StrictMode clientId={import.meta.env.VITE_APP_GOOGLE_CLIENT_ID}>
      <ThemeProvider>
        <UserProvider>
          <TimerProvider>
            <HydrationProvider>
              <App />
            </HydrationProvider>
          </TimerProvider>
        </UserProvider>
      </ThemeProvider>
    </React.StrictMode>
  </GoogleOAuthProvider>
);
