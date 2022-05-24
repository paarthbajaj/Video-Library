import axios from "axios";
import { createContext, useContext, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { users } from "../backend/db/users";
const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  let navigate = useNavigate();
  const signInAsGuest = async () => {
    try {
      const res = await axios.post("/api/auth/login", {
        email: users[0].email,
        password: users[0].password,
      });
      localStorage.setItem("key", res.data.encodedToken);
    } catch (err) {
      console.log(err);
    }
  };
  const signupClickHandler = async (e) => {
    e.preventDefault();
    try {
      const signupRes = await axios.post("/api/auth/signup", {
        email: authState.email,
        password: authState.password,
        name: authState.name,
        confirm_password: authState.confirm_password,
      });
      localStorage.setItem("key", signupRes.data.encodedToken);
      navigate("/home");
    } catch (err) {
      console.log(err);
    }
  };
  const signinClickHandler = async (e) => {
    e.preventDefault();
    try {
      const signinRes = await axios.post("/api/auth/login", {
        email: authState.email,
        password: authState.password,
      });
      localStorage.setItem("key", signinRes.data.encodedToken);
      navigate("/home");
    } catch (err) {
      console.log(err);
    }
  };
  const authReducer = (state, action) => {
    switch (action.type) {
      case "EDIT_NAME":
        return { ...state, name: action.payload };
      case "EDIT_EMAIL":
        return { ...state, email: action.payload };
      case "EDIT_PASSWORD":
        return { ...state, password: action.payload };
      case "EDIT_CONFIRM_PASSWORD":
        return { ...state, confirm_password: action.payload };
    }
  };
  const [authState, authDispatch] = useReducer(authReducer, {
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  return (
    <AuthContext.Provider
      value={{
        signInAsGuest,
        signupClickHandler,
        signinClickHandler,
        authState,
        authDispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);
export { useAuth, AuthContextProvider };
