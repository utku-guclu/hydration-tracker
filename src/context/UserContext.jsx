// UserContext.js
import React, { createContext, useContext, useEffect, useReducer } from "react";

const UserContext = createContext();

const initialState = {
  username: null,
  token: null,
};

const userReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      const { username, token } = action.payload;
      localStorage.setItem("token", token);
      localStorage.setItem("username", username);
      return { ...state, username, token };
    case "LOGOUT":
      // clearSession();
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      return { ...state, username: null, token: null };
    default:
      return state;
  }
};

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    if (token && username) {
      dispatch({ type: "LOGIN", payload: { token, username } });
    }
  }, []);

  const login = (user) => {
    dispatch({ type: "LOGIN", payload: user });
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <UserContext.Provider
      value={{ username: state.username, token: state.token, login, logout }}
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
