import { createSlice } from "@reduxjs/toolkit";

const MAX_RECENTLY_VIEWED = 8;

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    // restaurants: restaurant `info` summaries (id, name, cuisines,
    // cloudinaryImageId, avgRating, costForTwo, sla, veg — the same shape
    // RestrauntCard already renders) — stored denormalized so the
    // Favorites page doesn't need to re-fetch the restaurant list.
    restaurants: [],
    // recentlyViewed: same summary shape + viewedAt
    recentlyViewed: [],
  },
  reducers: {
    // payload: a restaurant's `info` object
    toggleFavorite: (state, action) => {
      const info = action.payload;
      const exists = state.restaurants.some((r) => r.id === info.id);
      state.restaurants = exists
        ? state.restaurants.filter((r) => r.id !== info.id)
        : [...state.restaurants, info];
    },
    addRecentlyViewed: (state, action) => {
      const info = action.payload;
      state.recentlyViewed = [
        { ...info, viewedAt: new Date().toISOString() },
        ...state.recentlyViewed.filter((r) => r.id !== info.id),
      ].slice(0, MAX_RECENTLY_VIEWED);
    },
  },
});

export const { toggleFavorite, addRecentlyViewed } = favoritesSlice.actions;
export default favoritesSlice.reducer;
