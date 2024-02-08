import axios from "axios";

import server from "../config/baseURL";

const authService = {
  login: async (username, password) => {
    try {
      const response = await axios.post(`${server}/auth/login`, {
        username,
        password,
      });
      return response.data;
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      throw new Error("Login failed");
    }
  },

  register: async (username, password) => {
    try {
      const response = await axios.post(`${server}/user/register`, {
        username,
        password,
      });

      return response.data;
    } catch (error) {
      console.error(
        "Registration failed:",
        error.response?.data || error.message
      );
      throw new Error("Registration failed");
    }
  },
};

export default authService;
