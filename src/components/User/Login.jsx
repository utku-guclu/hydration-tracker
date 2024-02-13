import React, { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import authService from "../../services/authService";

import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";

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

  const handleLogin = async () => {
    try {
      const user = await authService.login(username, password);
      login(user);
      // give success message to user - ui
      // navigate - redirect to user authenticated - homepage
      navigate("/");
    } catch (error) {
      // give error message to user - ui
      console.error("Login failed", error);
    } finally {
      setUsername("");
      setPassword("");
    }
  };

  useEffect(() => {
    if (username && password) {
      setHeadingColor("#646cff");
    } else {
      setHeadingColor("#333");
    }
  }, [username, password]);

  return (
    <div>
      <LoginHeading color={headingColor}>Login</LoginHeading>
      <form>
        <label htmlFor="login">
          <span>Username:</span>
          <input
            id="login"
            name="login"
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
        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
