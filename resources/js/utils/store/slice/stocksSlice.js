import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    stocks: {},
    stocksQuotes: {},
    stockLastQuote: {},
    activeStock: "A",
    lastId: null,
    tickerInfo: {
        tickSize: 2,
        tick: "0.01",
    },
};

export const stocksSlice = createSlice({
    name: "stocks",
    initialState,
    reducers: {
        updateStocks: (state, action) => {
            Object.assign(state.stocks, action.payload.stocks);
            state.lastId = action.payload.lastId;
        },
        updateStocksQuotes: (state, action) => {
            Object.assign(state.stocksQuotes, action.payload);
        },
        updateStockLastQuote: (state, action) => {
            state.stockLastQuote = action.payload;
        },
        updateActiveStock: (state, action) => {
            state.activeStock = action.payload;
        },
        updateSearchedStocks: (state, action) => {
            state.stocks = action.payload.stocks;
            state.lastId = action.payload.lastId;
        },
    },
});

// Action creators are generated for each case reducer function
export const {
    updateStocks,
    updateStocksQuotes,
    updateStockLastQuote,
    updateActiveStock,
    updateSearchedStocks,
} = stocksSlice.actions;

export default stocksSlice.reducer;
