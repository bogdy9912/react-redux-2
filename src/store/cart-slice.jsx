import { createSlice } from "@reduxjs/toolkit";

const cartInitialState = {
  items: [],
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: cartInitialState,
  reducers: {
    addItem(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity += 1;
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title,
        });
      } else {
        // const itemIndex = state.items.findIndex(
        //   (item) => item.id === newItem.id
        // );
        existingItem.quantity += 1;
        existingItem.totalPrice += existingItem.price;
        // state.items[itemIndex].quantity += 1;
        // state.items[itemIndex].totalPrice += newItem.price;
      }
    },
    removeItem(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalQuantity -= 1;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice -= existingItem.price;
      }
    },
  },
});

const cartActions = cartSlice.actions;
const cartReducer = cartSlice.reducer;

export { cartReducer, cartActions };
