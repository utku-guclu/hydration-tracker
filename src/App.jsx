import {
  Routes,
  Route,
  BrowserRouter as Router,
  Navigate,
} from "react-router-dom";

/* Hydration */
import { HydrationForm } from "./components/Hydration/HydrationForm";
import { HydrationLogs } from "./components/Hydration/HydrationLogs";
import { ThirstinessLevel } from "./components/Hydration/ThirstinessLevel";
import { ProgressBar } from "./components/ProgressBar";

/* User */
import { Google, SignIn, SignUp } from "./components/User/Google";
import Login from "./components/User/Login";
import Register from "./components/User/Register";
import Greeting from "./components/User/Greeting";

/* Timer */
import Timer from "./components/Timer/Timer";

/* Statistics Chart */
import { HydrationLogsPoolChart } from "./components/Hydration/HydrationLogsPoolChart";

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
      <>
        <section id="users">
          {username && <Greeting username={username} />}
        </section>
        <section id="water-level" style={{ marginTop: "20px" }}>
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
      </>
    );
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Hydration />} />
          <Route
            path="/login"
            element={token ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/register"
            element={token ? <Navigate to="/" /> : <Register />}
          />
          <Route path="/google" element={<Google />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
