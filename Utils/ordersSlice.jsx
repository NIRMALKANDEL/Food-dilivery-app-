import { createSlice } from "@reduxjs/toolkit";

const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    // list: Order[] — newest first. See Utils/orderService.js for the
    // Order shape and for how these are created/read.
    list: [],
  },
  reducers: {
    addOrder: (state, action) => {
      state.list.unshift(action.payload);
    },
  },
});

export const { addOrder } = ordersSlice.actions;
export default ordersSlice.reducer;
