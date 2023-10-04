import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const OPENWEATHER_API_URL = import.meta.env.VITE_OPENWEATHER_API_URL;
const OPENWEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

const initialState = {
  city: "",
  weather: {},
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const fetchWeather = createAsyncThunk("weather/fetchWeather", async ({ city, lat, lon }) => {
  const options = {
    method: 'GET',
    url: OPENWEATHER_API_URL+`/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}`,
  };

  const res = await axios.request(options);
  return { city, weather: res.data };
});

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setWeatherData(state, action) {
      state.weather = action.payload.weather;
    },
  },
  extraReducers(builder) {
    builder
    .addCase(fetchWeather.pending, (state) => {
      state.status = "loading";
    })
    .addCase(fetchWeather.fulfilled, (state, action) => {
      const { city, weather } = action.payload;
      state.status = "succeeded";
      state.city = city;
      state.weather = weather;
    })
    .addCase(fetchWeather.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    })
  }
});

export const getCity = (store) => store.weather.city;

export const getWeather = (store) => store.weather.weather;

export const getWeatherStatus = (store) => store.weather.status;

export default weatherSlice.reducer;