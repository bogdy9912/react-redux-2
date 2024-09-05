import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const firebase_url = process.env.REACT_APP_FIREBASE_REALTIME_DB_URL;

const cartInitialState = {
  items: [],
  totalQuantity: 0,
};

export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
  const response = await fetch(`${firebase_url}/cart.json`);
  const data = await response.json();
  return data;
});

export const addItem = createAsyncThunk(
  "cart/addItem",
  async ({ title, price, id }, { getState }) => {
    // I used this approach to handle the logic from the course
    const state = getState();
    let cart = { ...state.cart, items: [...state.cart.items.map((e) => e)] };

    const existingItem = cart.items.find((item) => item.id === id);
    cart.totalQuantity += 1;

    if (!existingItem) {
      cart.items.push({
        id: id,
        price: price,
        quantity: 1,
        totalPrice: price,
        name: title,
      });
    } else {
      const index = cart.items.findIndex((item) => item.id === id);
      const updatedItem = {
        ...cart.items[index],
        quantity: existingItem.quantity + 1,
        totalPrice: existingItem.totalPrice + existingItem.price,
      };

      cart.items[index] = updatedItem;
    }
    await fetch(`${firebase_url}/cart.json`, {
      method: "PUT",
      body: JSON.stringify(cart),
    });
    return { title, price, id };
  }
);

export const removeItem = createAsyncThunk(
  "cart/removeItem",
  async (id, { getState }) => {
    const state = getState();
    let cart = { ...state.cart, items: [...state.cart.items.map((e) => e)] };

    const existingItem = cart.items.find((item) => item.id === id);
    cart.totalQuantity -= 1;

    if (existingItem.quantity === 1) {
      cart.items = cart.items.filter((item) => item.id !== id);
    } else {
      const index = cart.items.findIndex((item) => item.id === id);
      const updatedItem = {
        ...cart.items[index],
        quantity: existingItem.quantity - 1,
        totalPrice: existingItem.totalPrice - existingItem.price,
      };

      cart.items[index] = updatedItem;
    }

    await fetch(`${firebase_url}/cart.json`, {
      method: "PUT",
      body: JSON.stringify(cart),
    });
    return id;
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: cartInitialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.totalQuantity = action.payload.totalQuantity;
      })
      .addCase(addItem.fulfilled, (state, action) => {
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
          existingItem.quantity += 1;
          existingItem.totalPrice += existingItem.price;
        }
      })
      .addCase(removeItem.fulfilled, (state, action) => {
        const id = action.payload;
        const existingItem = state.items.find((item) => item.id === id);
        state.totalQuantity -= 1;
        if (existingItem.quantity === 1) {
          state.items = state.items.filter((item) => item.id !== id);
        } else {
          existingItem.quantity--;
          existingItem.totalPrice -= existingItem.price;
        }
      });
  },
});

const cartActions = cartSlice.actions;
const cartReducer = cartSlice.reducer;

export { cartReducer, cartActions };
