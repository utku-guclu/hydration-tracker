import React, { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import authService from "../../services/authService";

const Register = () => {
  // Access user and token using useUser hook
  const { username: accessedUser, token, login, logout } = useUser();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const user = await authService.register(username, password);
      login(user); // {token, username}
      // give success message to user - ui
      // save data to localstorage
      // navigate - redirect to user authenticated - homepage
    } catch (error) {
      // give error message to user - ui
      console.error("Registration failed", error);
    }
  };

  useEffect(() => {
    console.log("user:", accessedUser);
    console.log("token:", token);
  }, [accessedUser]);

  return (
    <div>
      <h2>Register</h2>
      <form>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
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
