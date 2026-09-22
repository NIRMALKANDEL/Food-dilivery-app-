import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import favoritesReducer from "./favoritesSlice";
import ordersReducer from "./ordersSlice";
import locationReducer from "./locationSlice";

const STORAGE_KEY = "nibblr-state";

const DEFAULT_STATE = {
  cart: { items: [], restaurantId: null },
  favorites: { restaurants: [], recentlyViewed: [] },
  orders: { list: [] },
  location: { label: null, lat: null, lng: null },
};

const loadStateFromStorage = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return DEFAULT_STATE;
    const parsed = JSON.parse(saved);
    // Shallow-merge over the defaults so a state shape from an older
    // version of the app (missing a newly-added slice) can't crash the
    // store on load.
    return {
      cart: { ...DEFAULT_STATE.cart, ...parsed.cart },
      favorites: { ...DEFAULT_STATE.favorites, ...parsed.favorites },
      orders: { ...DEFAULT_STATE.orders, ...parsed.orders },
      location: { ...DEFAULT_STATE.location, ...parsed.location },
    };
  } catch (err) {
    return DEFAULT_STATE;
  }
};

const appStore = configureStore({
  reducer: {
    cart: cartReducer,
    favorites: favoritesReducer,
    orders: ordersReducer,
    location: locationReducer,
  },
  preloadedState: loadStateFromStorage(),
});

// Cart/favorites/orders/location are the only state worth surviving a
// refresh/deploy for this app, so persist just those slices rather than the
// whole store.
appStore.subscribe(() => {
  try {
    const state = appStore.getState();
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        cart: state.cart,
        favorites: state.favorites,
        orders: state.orders,
        location: state.location,
      })
    );
  } catch (err) {
    // localStorage can be unavailable (private mode, disabled storage) —
    // state simply won't persist across reloads in that case.
  }
});

export default appStore;
