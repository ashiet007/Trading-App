import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  deals: [],
};

export const dealSlice = createSlice({
  name: "deal",
  initialState,
  reducers: {
    updateDeals: (state, action) => {
      state.deals = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateDeals } = dealSlice.actions;

export default dealSlice.reducer;
