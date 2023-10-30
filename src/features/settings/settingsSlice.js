import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  temperatureUnit: "Celsius",
  windSpeedUnit: "m/s",
  backgroundColor: "blue"
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setTemperatureUnit(state, action) {
      state.temperatureUnit = action.payload;
    },
    setWindSpeedUnit(state, action) {
      state.windSpeedUnit = action.payload;
    },
    setBackgroundColor(state, action) {
      state.backgroundColor = action.payload;
    }
  },
});

export const getTemperatureUnit = (store) => store.settings.temperatureUnit;

export const getWindSpeedUnit = (store) => store.settings.windSpeedUnit;

export const getBackgroundColor = (store) => store.settings.backgroundColor;

export const { setTemperatureUnit, setWindSpeedUnit, setBackgroundColor } = settingsSlice.actions;

export default settingsSlice.reducer;