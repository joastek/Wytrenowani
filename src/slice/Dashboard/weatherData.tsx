// weatherSlice.js

import { createSlice } from "@reduxjs/toolkit";

import { WeatherData, GeolocalizationData } from "@/types/type";

interface WeatherState {
  currentWeather: WeatherData | null;
  currLocation: GeolocalizationData | null;
}

const initialState: WeatherState = {
  currentWeather: null,
  currLocation: null,
};
const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setCurrentWeather: (state, action) => {
      state.currentWeather = action.payload;
    },
    setCurrLocation: (state, action) => {
      state.currLocation = action.payload;
    },
  },
});

export const { setCurrentWeather, setCurrLocation } = weatherSlice.actions;
export default weatherSlice.reducer;
