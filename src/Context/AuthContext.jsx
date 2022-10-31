import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext({});

const initialState = {
  isLoggedin: false,
  username: "",
  userType: "",
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isLoggedin: true,
        username: action.payload.username,
        userType: action.payload.type,
      };
    case "LOGOUT":
      localStorage.removeItem("token");
      return initialState;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const login = (username, userType) => {
    dispatch({ type: "LOGIN", payload: { username, userType } });
  };
  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };
  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
