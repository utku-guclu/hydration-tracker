import React, { useState } from "react";
import { useUser } from "../../context/UserContext";
import authService from "../../services/authService";

const Register = () => {
  const { login } = useUser();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const user = await authService.register(username, password);
      const userData = login(user); // {token, username}
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

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
