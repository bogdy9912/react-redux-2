import { cartReducer } from "./cart-slice";
import { uiReducer } from "./ui-slice";

import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    ui: uiReducer,
    cart: cartReducer
  },
});

export default store;
