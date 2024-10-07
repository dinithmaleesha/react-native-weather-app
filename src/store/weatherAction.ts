import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const getWeather = createAsyncThunk(
  'getWeather',
  async ({ latitude, longitude }: { latitude: number, longitude: number }) => {
    try {
      console.log(`Fetching Weather: ${latitude} ${longitude}`);
      
      const { data } = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,precipitation,rain,cloud_cover,wind_speed_10m,wind_direction_10m&timezone=auto&forecast_days=1`);
      console.log('Data fetched');
      console.log(JSON.stringify(data, null, 2));
    
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);
