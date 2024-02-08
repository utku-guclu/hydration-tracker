import React, { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import authService from "../../services/authService";

import { styled } from "@mui/system";

const LoginHeading = styled("h2")(({ color }) => ({
  color: color,
}));

const Login = () => {
  const [headingColor, setHeadingColor] = useState("#333");
  // Access user and token using useUser hook
  const { username: accessedUser, token, login, logout } = useUser();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const user = await authService.login(username, password);
      login(user); // {token, username}
      // give success message to user - ui
      // save data to localstorage
      // navigate - redirect to user authenticated - homepage
    } catch (error) {
      // give error message to user - ui
      console.error("Login failed", error);
    }
  };

  useEffect(() => {
    console.log("user:", accessedUser);
    console.log("token:", token);
  }, [accessedUser]);

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
          Username:
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
          Password:
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
