import axios from "axios";

const BASE_URL = "http://localhost:3000";

const authService = {
  login: async (username, password) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/auth/login`, {
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
      const response = await axios.post(`${BASE_URL}/api/user/register`, {
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
