import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { users } from "../../backend/db/users";

export const signInAsGuest = createAsyncThunk("signinAsGuest", async () => {
  try {
    const { data } = await axios.post("/api/auth/login", {
      email: users[0].email,
      password: users[0].password,
    });
    localStorage.setItem("key", data.encodedToken);
  } catch (err) {
    console.log(err);
  }
});
export const signinClickHandler = createAsyncThunk("signin", async (args) => {
  const { email, password, navigate } = args;
  try {
    const { data } = await axios.post("/api/auth/login", {
      email: email,
      password: password,
    });
    localStorage.setItem("key", data.encodedToken);
    navigate("/home");
  } catch (err) {
    console.log(err);
  }
});
export const signupClickHandler = createAsyncThunk("singup", async (args) => {
  const { name, email, password, confirm_password, navigate } = args;
  try {
    const { data } = await axios.post("/api/auth/signup", {
      email: email,
      password: password,
      name: name,
      confirm_password: confirm_password,
    });
    localStorage.setItem("key", data.encodedToken);
    navigate("/home");
  } catch (err) {
    console.log(err);
  }
});
