import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";

const CART_STORAGE_KEY = "swiggy-clone-cart";

const loadCartFromStorage = () => {
  try {
    const saved = localStorage.getItem(CART_STORAGE_KEY);
    return saved ? JSON.parse(saved) : undefined;
  } catch (err) {
    return undefined;
  }
};

const appStore = configureStore({
  reducer: {
    cart: cartReducer,
  },
  preloadedState: {
    cart: loadCartFromStorage() || { items: [], restaurantId: null },
  },
});

// Cart is the only state worth surviving a refresh/deploy for this app, so
// persist just that slice rather than the whole store.
appStore.subscribe(() => {
  try {
    localStorage.setItem(
      CART_STORAGE_KEY,
      JSON.stringify(appStore.getState().cart)
    );
  } catch (err) {
    // localStorage can be unavailable (private mode, disabled storage) —
    // the cart simply won't persist across reloads in that case.
  }
});

export default appStore;
