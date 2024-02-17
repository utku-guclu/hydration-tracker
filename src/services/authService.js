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

  checkAccess: async (token) => {
    try {
      const response = await axios.post(`${server}/auth/access`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        // Access granted
        return true;
      } else {
        // Access denied
        console.error("Access denied:", response.statusText);
        return false;
      }
    } catch (error) {
      // Access denied
      console.error("Access denied:", error.message);
    }
  },
};

export default authService;
