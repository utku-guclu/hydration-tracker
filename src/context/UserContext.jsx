// UserContext.js
import React, { createContext, useContext, useEffect, useReducer } from "react";

import authService from "../services/authService";

const UserContext = createContext();

const initialState = {
  username: null,
  token: null,
  userId: null,
  lastName: "",
  picture: null,
};

const userReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      const { username, token, userId, lastName, picture } = action.payload;
      localStorage.setItem("token", token);
      localStorage.setItem("username", username);
      return { ...state, username, token, userId, lastName, picture };
    case "LOGOUT":
      // clearSession();
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("user");
      return { ...state, username: null, token: null, userId: null };
    default:
      return state;
  }
};

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  // access check
  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");

    const google = localStorage.getItem("user");
    const fetchUserStatus = async () => {
      try {
        if (google) {
          const googleUser = JSON.parse(google);
          console.log(googleUser);
          const { firstName: username, token, lastName, picture } = googleUser;
          const user = { token, username, lastName, picture };
          login(user);
        } else if (token && username) {
          const userStatus = await authService.checkAccess(token);
          if (userStatus) {
            const user = { token, username };
            login(user);
          }
        }
      } catch (error) {
        console.error("Error checking access:", error);
        logout();
      }
    };
    fetchUserStatus();
  }, []);

  const login = (user) => {
    dispatch({ type: "LOGIN", payload: user });
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <UserContext.Provider
      value={{
        username: state.username,
        lastName: state.lastName,
        picture: state.picture,
        token: state.token,
        userId: state.userId,
        login,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export { UserProvider, useUser };
