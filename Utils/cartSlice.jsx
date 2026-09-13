import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    restaurantId: null,
  },

  reducers: {
    // payload: { id, name, price, imageId, description, restaurantId }
    addItem: (state, action) => {
      const { id, name, price, imageId, description, restaurantId } =
        action.payload;

      // A cart can only hold items from one restaurant at a time, just like
      // the real app — switching restaurants clears whatever was in there.
      if (restaurantId && state.restaurantId && state.restaurantId !== restaurantId) {
        state.items = [];
      }
      if (restaurantId) state.restaurantId = restaurantId;

      const existing = state.items.find((item) => item.id === id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ id, name, price, imageId, description, quantity: 1 });
      }
    },
    // payload: id
    removeItem: (state, action) => {
      const id = action.payload;
      const existing = state.items.find((item) => item.id === id);
      if (!existing) return;
      if (existing.quantity > 1) {
        existing.quantity -= 1;
      } else {
        state.items = state.items.filter((item) => item.id !== id);
      }
      if (state.items.length === 0) state.restaurantId = null;
    },
    // payload: id — removes the item entirely regardless of quantity
    deleteItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      if (state.items.length === 0) state.restaurantId = null;
    },
    clearCart: (state) => {
      state.items = [];
      state.restaurantId = null;
    },
  },
});

export const { addItem, removeItem, deleteItem, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
