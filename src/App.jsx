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
import Timer from "./components/Hydration/Timer";
import { useTimer } from "./context/TimerContext";

/* Layout */
import Layout from "./components/Layout";

function App() {
  const Hydration = () => {
    return (
      <>
        <HydrationForm />
        <HydrationLogs />
        <Timer />
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
          {/* <Route path="*" element={<NotFound />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;