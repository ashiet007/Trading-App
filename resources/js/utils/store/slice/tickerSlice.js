import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cryptocurrencies: {},
  activeTicker: "BTCGBP",
  tickerInfo: {
    tickSize: 2,
    tick: "0.01",
  },
  activeMarket: "GBP",
  marketPairs: {},
  bookTickers: {},
};

export const tickerSlice = createSlice({
  name: "ticker",
  initialState,
  reducers: {
    updateCryptocurrencies: (state, action) => {
      state.cryptocurrencies = action.payload;
    },
    updateActiveTicker: (state, action) => {
      state.activeTicker = action.payload;
    },
    updateTickInfo: (state, action) => {
      state.tickerInfo.tickSize = action.payload.tick_size;
      state.tickerInfo.tick = action.payload.tick;
    },
    updateActiveMarket: (state, action) => {
      state.activeMarket = action.payload;
    },
    updateMarketPairs: (state, action) => {
      Object.assign(state.marketPairs, action.payload);
    },
    updateBookTickers: (state, action) => {
      Object.assign(state.bookTickers, action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  updateCryptocurrencies,
  updateActiveTicker,
  updateTickInfo,
  updateActiveMarket,
  updateMarketPairs,
  updateBookTickers,
} = tickerSlice.actions;

export default tickerSlice.reducer;
