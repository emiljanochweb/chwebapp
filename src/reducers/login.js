import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    isLogged: false,
    user: null,
    password: null,
    id: null,
    isAdmin: 0
  },
  reducers: {
    login: (state, action) => {
      state.isLogged = true;
      state.user = action.payload.username;
      state.password = action.payload.password;
      state.id = action.payload.id;
      state.isAdmin = action.payload.isAdmin;
    },
    logout: (state) => {
      state.isLogged = false;
      state.user = null;
      state.password = null,
      state.id = null;
      state.isAdmin = 0;
    },
  },
});

export const { login, logout } = loginSlice.actions;

export default loginSlice.reducer;
