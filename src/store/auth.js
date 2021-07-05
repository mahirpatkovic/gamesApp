import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
    isAuthenticated: false,
    currentUser: null,
};
const authSlice = createSlice({
    name: 'authentication',
    initialState: initialAuthState,
    reducers: {
        login(state) {
            state.isAuthenticated = true;
        },
        logout(state) {
            state.isAuthenticated = false;
        },
        setUser(state, action) {
            state.currentUser = action.payload;
        },
    },
});
export const authActions = authSlice.actions;

export default authSlice.reducer;