import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    forexes: {},
    forexQuotes: {},
    forexLastQuote: {},
    activeForex: "AED/AUD",
    lastId: null,
    tickerInfo: {
        tickSize: 4,
        tick: "0.0001",
    },
};

export const forexSlice = createSlice({
    name: "forex",
    initialState,
    reducers: {
        updateForexes: (state, action) => {
            Object.assign(state.forexes, action.payload.forexes);
            state.lastId = action.payload.lastId;
        },
        updateForexQuotes: (state, action) => {
            Object.assign(state.forexQuotes, action.payload);
        },
        updateForexLastQuote: (state, action) => {
            state.forexLastQuote = action.payload;
        },
        updateActiveForex: (state, action) => {
            state.activeForex = action.payload;
        },
        updateSearchedForex: (state, action) => {
            state.forexes = action.payload.forexes;
            state.lastId = action.payload.lastId;
        },
    },
});

// Action creators are generated for each case reducer function
export const {
    updateForexes,
    updateForexQuotes,
    updateForexLastQuote,
    updateActiveForex,
    updateSearchedForex,
} = forexSlice.actions;

export default forexSlice.reducer;
