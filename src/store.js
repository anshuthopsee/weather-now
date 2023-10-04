import { configureStore } from "@reduxjs/toolkit";
import searchReducer from './features/search/searchSlice';
import weatherReducer from './features/weather/weatherSlice';
import forecastReducer from './features/forecast/forecastSlice';
import settingsReducer from './features/settings/settingsSlice';

export const store = configureStore({
  reducer: {
    search: searchReducer,
    weather: weatherReducer,
    forecast: forecastReducer,
    settings: settingsReducer,
  }
});