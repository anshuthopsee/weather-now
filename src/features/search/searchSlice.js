import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const GEODB_URL = import.meta.env.VITE_GEODB_API_URL;
const GEODB_KEY = import.meta.env.VITE_GEODB_API_KEY;

const initialState = {
  inputedText: "",
  results: [],
  memoizedResults: {}, /* { city: { cities: [] } */
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed',
  error: null,
};

export let controller;

export const fetchSearchResults = createAsyncThunk("cities/fetchSearchResults", async (formattedText) => {
  controller = new AbortController();

  const options = {
    method: 'GET',
    url: GEODB_URL+`?minPopulation=5000&limit=5&namePrefix=${formattedText}`,
    headers: {
      'X-RapidAPI-Key': GEODB_KEY,
      'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
    },
    signal: controller.signal
  };

  const res = await axios.request(options);
  return { text: formattedText, results: res.data.data };
});

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setInputedText(state, action) {
      const { text, loading } = action.payload;
      if (loading) {
        state.status = "loading";
      };
      state.inputedText = text;
      state.error = null;
    },
    setResults(state, action) {
      state.status = "succeeded";
      state.results = action.payload;
    },
    clearResults(state) {
      state.results = [];
      state.status = "idle";
    }
  },
  extraReducers(builder) {
    builder
    .addCase(fetchSearchResults.pending, (state) => {
      state.status = "loading";
    })
    .addCase(fetchSearchResults.fulfilled, (state, action) => {
      const results = action.payload.results;
      state.status = "succeeded";
      const inputedText = state.inputedText.split(",")[0];
      if (inputedText === action.payload.text) {
        state.results = results;
      };
      state.memoizedResults = {...state.memoizedResults, 
        [action.payload.text]: results
      };
      state.error = null;
    })
    .addCase(fetchSearchResults.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
      console.log(action.error.message)
      state.results = [];
    });
  }
});

export const getSearchStatus = (store) => store.search.status;

export const getSearchError = (store) => store.search.error;

export const getInputedText = (store) => store.search.inputedText;

export const { setInputedText, clearResults, setResults } = searchSlice.actions;

export const getResults = (store) => store.search.results;

export const getMemoizedResults = (store) => store.search.memoizedResults;

export default searchSlice.reducer;