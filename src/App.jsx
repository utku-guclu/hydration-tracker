import { useContext } from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";

/* Hydration */
import HydrationForm from "./components/Hydration/HydrationForm";
import HydrationLogs from "./components/Hydration/HydrationLogs";
import ThirstinessLevel from "./components/Hydration/ThirstinessLevel";
import { ProgressBar } from "./components/ProgressBar";

/* User */
import Login from "./components/User/Login";
import Register from "./components/User/Register";

/* Timer */
import Timer from "./components/Timer/Timer";

/* Statistics Chart */
import HydrationLogsPoolChart from "./components/Hydration/HydrationLogsPoolChart";

/* Layout */
import Layout from "./components/Layout";

/* Not Found */
import NotFound from "./components/NotFound";

/* Hooks */
import { useUser } from "./context/UserContext";

/* Styles */
import "./App.css";

function App() {
  const { token, username } = useUser();

  const Hydration = () => {
    return (
      <main>
        <section id="water" style={{ marginTop: "20px" }}>
          {username && <Greeting username={username} />}
          <ThirstinessLevel />
          <ProgressBar />
        </section>
        <section id="hydration">
          <HydrationForm />
          <HydrationLogs />
        </section>
        <section id="timer">
          <Timer />
        </section>
        <section
          id="statistics"
          style={{ margin: token ? "20px 0 100px" : "20px 0 50px" }}
        >
          <HydrationLogsPoolChart />
        </section>
      </main>
    );
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Hydration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
