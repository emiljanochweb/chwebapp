import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
    name: "login",
    initialState: {
        isLogged: false
    },
    reducers: {
        login: (state) => {
            state.isLogged = true
        },
        logout: (state) => {
            state.isLogged = false
        }
    }
});

export default loginSlice.reducer;