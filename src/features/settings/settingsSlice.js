import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  temperatureUnit: "Celsius",
  windSpeedUnit: "m/s",
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
  },
});

export const getTemperatureUnit = (store) => store.settings.temperatureUnit;

export const getWindSpeedUnit = (store) => store.settings.windSpeedUnit;

export const { setTemperatureUnit, setWindSpeedUnit } = settingsSlice.actions;

export default settingsSlice.reducer;