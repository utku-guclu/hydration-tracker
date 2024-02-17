import React, { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import authService from "../../services/authService";

import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginHeading = styled("h2")(({ color }) => ({
  color,
}));

const Login = () => {
  const [headingColor, setHeadingColor] = useState("#333");
  // Access user
  const { login } = useUser();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await authService.login(username, password);
      login(user);
      // give success message to user - ui
      toast.success("Login successful!");
      // navigate - redirect to user authenticated - homepage
      navigate("/");
    } catch (error) {
      // give error message to user - ui
      toast.error(error.toString().slice(6));
    } finally {
      setUsername("");
      setPassword("");
    }
  };

  const handleUserChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePassChange = (e) => {
    setPassword(e.target.value);
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
      <ToastContainer />
      <LoginHeading color={headingColor}>Login</LoginHeading>
      <form onSubmit={handleLogin}>
        <label htmlFor="login">
          <span>Username:</span>
          <input
            id="login"
            name="login"
            type="text"
            value={username}
            autoComplete="username"
            onChange={handleUserChange}
            required
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
            onChange={handlePassChange}
            required
          />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
