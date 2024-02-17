import React, { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import authService from "../../services/authService";

import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const RegisterHeading = styled("h2")(({ color }) => ({
  color: color,
}));

const Register = () => {
  const [headingColor, setHeadingColor] = useState("#333");
  // Access user and token using useUser hook
  const { username: accessedUser, token, login, logout } = useUser();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const user = await authService.register(username, password);
      login(user); // {token, username}
      // give success message to user - ui
      toast.success("Registration successful!");
      // navigate - redirect to user authenticated - homepage
      navigate("/");
    } catch (error) {
      // give error message to user - ui
      console.error("Registration failed", error);
      toast.error(error.toString().slice(6));
    } finally {
      setUsername("");
      setPassword("");
    }
  };

  useEffect(() => {
    if (username && password) {
      setHeadingColor("var(--main-color)");
    } else {
      setHeadingColor("#333");
    }
  }, [username, password]);

  return (
    <div>
      <ToastContainer/>
      <RegisterHeading color={headingColor}>Register</RegisterHeading>
      <form>
        <label htmlFor="register">
          <span>Username:</span>
          <input
            id="register"
            name="register"
            type="text"
            value={username}
            autoComplete="username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label htmlFor="password">
          <span>Password:</span>
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="button" onClick={handleRegister}>
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
