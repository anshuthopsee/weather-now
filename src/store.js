import { configureStore } from "@reduxjs/toolkit";
import searchReducer from './features/search/searchSlice';
import weatherReducer from './features/weather/weatherSlice';
import forecastReducer from './features/forecast/forecastSlice';
import settingsReducer, { setTemperatureUnit, setWindSpeedUnit, setBackgroundColor } from './features/settings/settingsSlice';

const localStorageMiddleware = (store) => (next) => (action) => {
  const result = next(action);

  if (action.type === 'settings/setTemperatureUnit' || action.type === 'settings/setWindSpeedUnit' || action.type === 'settings/setBackgroundColor') {
    const settings = {
      temperatureUnit: store.getState().settings.temperatureUnit,
      windSpeedUnit: store.getState().settings.windSpeedUnit,
      backgroundColor: store.getState().settings.backgroundColor
    };
    localStorage.setItem('appSettings', JSON.stringify(settings));
  };

  return result;
};

export const store = configureStore({
  reducer: {
    search: searchReducer,
    weather: weatherReducer,
    forecast: forecastReducer,
    settings: settingsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware),
});

const savedSettings = JSON.parse(localStorage.getItem('appSettings'));

if (savedSettings) {
  store.dispatch(setTemperatureUnit(savedSettings.temperatureUnit));
  store.dispatch(setWindSpeedUnit(savedSettings.windSpeedUnit));
  store.dispatch(setBackgroundColor(savedSettings.backgroundColor));
};