import { createSlice } from "@reduxjs/toolkit";
import { getWeather } from "./weatherAction";

export interface WeatherState {
  weather: any,
  loading: boolean,
  splashText: string
}

const initialState : WeatherState = {
  weather: [],
  loading: false,
  splashText: 'Loading...'
}

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(
      getWeather.fulfilled,
      (state, actions) => {
        state.weather = actions.payload
        state.loading = false
        state.splashText = 'Launching...'
      }
    ),
      builder.addCase(
        getWeather.pending,
        (state, actions) => {
          state.loading = true
          state.splashText = 'Fetching Weather Data...'
        }
      ),
      builder.addCase(
        getWeather.rejected,
        (state, actions) => {
          state.weather = []
          state.loading = true
          state.splashText = 'Please try again later'
        }
      )
  }
})

export default weatherSlice.reducer