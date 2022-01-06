import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    marketStatus: "closed",
};

export const commonSlice = createSlice({
    name: "common",
    initialState,
    reducers: {
        updateMarketStatus: (state, action) => {
            state.marketStatus = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { updateMarketStatus } = commonSlice.actions;

export default commonSlice.reducer;
