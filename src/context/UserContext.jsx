// UserContext.js
import React, { createContext, useContext, useReducer } from "react";

const UserContext = createContext();

const initialState = {
  username: null,
  token: null,
};

const userReducer = (state, action) => {
  const { username, token } = action.payload;
  switch (action.type) {
    case "LOGIN":
      return { ...state, username, token };
    case "LOGOUT":
      return { ...state, username: null, token: null };
    default:
      return state;
  }
};

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

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
