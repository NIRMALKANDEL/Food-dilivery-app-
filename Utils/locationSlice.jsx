import { createSlice } from "@reduxjs/toolkit";

const locationSlice = createSlice({
  name: "location",
  initialState: {
    // null until the visitor explicitly sets one — components fall back to
    // DEFAULT_COORDS themselves rather than seeding that here, so it stays
    // obvious whether a location was actually chosen.
    label: null,
    lat: null,
    lng: null,
  },
  reducers: {
    setLocation: (state, action) => {
      const { label, lat, lng } = action.payload;
      state.label = label;
      state.lat = lat;
      state.lng = lng;
    },
    clearLocation: (state) => {
      state.label = null;
      state.lat = null;
      state.lng = null;
    },
  },
});

export const { setLocation, clearLocation } = locationSlice.actions;
export default locationSlice.reducer;
