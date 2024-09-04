import { createSlice } from "@reduxjs/toolkit";

const uiInitialState = {
  cartIsVisible: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState: uiInitialState,
  reducers: {
    toggle(state) {
      state.cartIsVisible = !state.cartIsVisible;
    },
  },
});


const uiReducer = uiSlice.reducer;
const uiActions = uiSlice.actions;

export { uiReducer, uiActions };
