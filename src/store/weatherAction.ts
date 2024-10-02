import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const getWeather = createAsyncThunk(
  'getWeather',
  async () => {
    try {
      const { data } = await axios.get('https://api.open-meteo.com/v1/forecast?latitude=6.9355&longitude=79.8487&current=temperature_2m,precipitation&forecast_days=1')
      console.log('Data fetched')
      console.log(JSON.stringify(data, null, 2));
    
      return data
    } catch (error) {
      console.log(error);
    }
  }
)