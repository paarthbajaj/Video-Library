const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  name: "",
  email: "",
  password: "",
  confirm_password: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setName(state, action) {
      state.name = action.payload;
    },
    setEmail(state, action) {
      state.email = action.payload;
    },
    setPassword(state, action) {
      state.password = action.payload;
    },
    setConfirmPassword(state, action) {
      state.confirm_password = action.payload;
    },
  },
});
export const { setName, setEmail, setPassword, setConfirmPassword } =
  authSlice.actions;
export default authSlice.reducer;
