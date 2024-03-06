import React, { useEffect, useState, useContext } from "react";
import { useUser } from "../../context/UserContext";
import authService from "../../services/authService";

import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import InlineText from "../../context/InlineText";

import { SignIn } from "./Google";
import { CircularProgress } from "@mui/material";

import ValidationTextField from "../UI/ValidationTextField";

import { ThemeContext } from "../../context/Theme";

const LoginHeading = styled("h2")(({ color }) => ({
  color,
  backgroundColor: "var(--dark)",
  margin: "0",
  padding: "10px",
}));

const Login = () => {
  const [headingColor, setHeadingColor] = useState("var(--gray)");
  // Access user
  const { login } = useUser();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const { isDarkTheme, theme } = useContext(ThemeContext);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const user = await authService.login(username, password);
      login(user);
      // give success message to user - ui
      toast.success("Login successful!");
      // navigate - redirect to user authenticated - homepage
      navigate("/");
    } catch (error) {
      // give error message to user - ui
      const errorMessage = error.toString().slice(6);
      toast.error(errorMessage);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
      setUsername("");
      setPassword("");
    }
  };

  const handleUserChange = (e) => {
    setError(false);
    setUsername(e.target.value);
  };

  const handlePassChange = (e) => {
    setError(false);
    setPassword(e.target.value);
  };

  const handleGoogle = () => {
    e.preventDefault();
  };

  useEffect(() => {
    if (username && password) {
      setHeadingColor("var(--secondary-color)");
    } else {
      setHeadingColor("var(--gray)");
    }
  }, [username, password]);

  return (
    <div>
      <ToastContainer />
      <form className="google-form" onSubmit={handleGoogle}>
        <SignIn />
      </form>
      <LoginHeading color={headingColor}>Login</LoginHeading>
      <form
        style={{
          backgroundColor: isDarkTheme ? theme.hydrated : "inherit",
        }}
        className="user-form"
        onSubmit={handleLogin}
      >
        <ValidationTextField
          autoComplete="off"
          id="login"
          name="login"
          type="text"
          value={username}
          onChange={handleUserChange}
          placeholder="John"
          helperText={error}
          error={!!error}
          label={"Username"}
        />

        <br />

        <ValidationTextField
          id="password"
          name="password"
          type="password"
          value={password}
          autoComplete="off"
          onChange={handlePassChange}
          placeholder="*****"
          helperText={error}
          error={!!error}
          label={"Password"}
        />

        <br />

        {isLoading ? (
          <CircularProgress style={{ margin: "0 auto" }} />
        ) : (
          <button type="submit">LOGIN</button>
        )}
      </form>
    </div>
  );
};

export default Login;
