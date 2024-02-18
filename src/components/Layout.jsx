import React from "react";
import { Outlet, useLocation } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";
import Greeting from "../components/User/Greeting";
import ThirstinessLevel from "./Hydration/ThirstinessLevel";

import { useUser } from "../context/UserContext";

const Layout = () => {
  const { username } = useUser();
  const location = useLocation();
  return (
    <>
      <Header />
      <aside>
        {username && <Greeting username={username} />}
        {location.pathname === "/" && <ThirstinessLevel />}
      </aside>
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
