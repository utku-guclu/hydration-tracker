import React, { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import authService from "../../services/authService";

import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import InlineText from "../../context/InlineText";

import { SignUp } from "./Google";
import { CircularProgress } from "@mui/material";

const RegisterHeading = styled("h2")(({ color }) => ({
  color: color,
  backgroundColor: "var(--dark)",
  margin: "0",
  padding: "10px",
}));

const Register = () => {
  const [headingColor, setHeadingColor] = useState("var(--gray)");
  // Access user and token using useUser hook
  const { username: accessedUser, token, login, logout } = useUser();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
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
      setIsLoading(false);
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
        <SignUp />
      </form>
      <RegisterHeading color={headingColor}>Register</RegisterHeading>
      <form className="user-form" onSubmit={handleRegister}>
        <label htmlFor="register">
          <InlineText>Username:</InlineText>
          <input
            id="register"
            name="register"
            type="text"
            value={username}
            placeholder="John"
            autoComplete="username"
            onChange={handleUserChange}
            required
          />
        </label>
        <br />
        <label htmlFor="password">
          <InlineText>Password:</InlineText>
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            placeholder="*****"
            autoComplete="current-password"
            onChange={handlePassChange}
            required
          />
        </label>
        <br />
        {isLoading ? (
          <CircularProgress style={{ margin: "0 auto" }} />
        ) : (
          <button type="submit">Register</button>
        )}
      </form>
    </div>
  );
};

export default Register;
