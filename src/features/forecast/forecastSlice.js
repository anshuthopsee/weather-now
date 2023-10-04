import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const OPENWEATHER_API_URL = import.meta.env.VITE_OPENWEATHER_API_URL;
const OPENWEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

const initialState = {
  forecast: {},
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const fetchForecast = createAsyncThunk("forecast/fetchForecast", async ({ city, lat, lon }) => {
  const options = {
    method: 'GET',
    url: OPENWEATHER_API_URL+`forecast?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}`,
  };

  const res = await axios.request(options);
  return { city, forecast: res.data };
});

const forecastSlice = createSlice({
  name: 'forecast',
  initialState,
  reducers: {
    setWeatherData(state, action) {
      state.weather = action.payload.weather;
    },
  },
  extraReducers(builder) {
    builder
    .addCase(fetchForecast.pending, (state) => {
      state.status = "loading";
    })
    .addCase(fetchForecast.fulfilled, (state, action) => {
      const { forecast } = action.payload;
      state.status = "succeeded";
      state.forecast = forecast;
    })
    .addCase(fetchForecast.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    })
  }
});

export const getForecast = (store) => store.forecast.forecast;

export const getForecastStatus = (store) => store.forecast.status;

export default forecastSlice.reducer;
