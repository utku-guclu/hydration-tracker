import React from "react";
import { Outlet, useLocation } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";

import Greeting from "../components/User/Greeting";
import { ProgressBar } from "../components/ProgressBar";

import { useUser } from "../context/UserContext";
import { useHydration } from "../context/HydrationContext";

import ThirstinessLevel from "./Hydration/ThirstinessLevel";

const Layout = () => {
  const { username } = useUser();
  const location = useLocation();
  const { convertedTotal, unit, convertedDailyGoal } = useHydration();

  return (
    <>
      <Header />
      <aside style={{ marginTop: "20px" }}>
        {username && <Greeting username={username} />}
        {location.pathname === "/" && <ThirstinessLevel />}
        {location.pathname === "/" && (
          <ProgressBar
            convertedDailyGoal={convertedDailyGoal}
            unit={unit}
            convertedTotal={convertedTotal}
          />
        )}
      </aside>
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
