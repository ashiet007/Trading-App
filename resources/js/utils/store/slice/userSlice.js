import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    wallet: 0.0,
    user: null,
    isAuthenticated: false,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        updateWallet: (state, action) => {
            state.wallet = action.payload;
        },
        updateUser: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        removeUser: (state, action) => {
            state.user = null;
            state.isAuthenticated = false;
            state.wallet = 0.0;
            state.deal
        },
    },
});

// Action creators are generated for each case reducer function
export const { updateWallet, updateUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
