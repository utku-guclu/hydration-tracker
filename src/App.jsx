import { Routes, Route, BrowserRouter as Router } from "react-router-dom";

/* Hydration */
import HydrationForm from "./components/Hydration/HydrationForm";
import HydrationLogs from "./components/Hydration/HydrationLogs";

/* User */
import Login from "./components/User/Login";
import Register from "./components/User/Register";

/* Styles */
import "./App.css";

/* Timer */
import Timer from "./components/Timer/Timer";

/* Layout */
import Layout from "./components/Layout";

/* Not Found */
import NotFound from "./components/NotFound";

/* Statistics Chart */
import HydrationLogsPoolChart from "./components/Hydration/HydrationLogsPoolChart";

function App() {
  const Hydration = () => {
    return (
      <>
        <section id="hydration">
          <HydrationForm />
          <HydrationLogs />
        </section>
        <section id="timer">
          <Timer />
        </section>
        <section style={{ marginBottom: "100px" }} id="statistics">
          <HydrationLogsPoolChart />
        </section>
      </>
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
