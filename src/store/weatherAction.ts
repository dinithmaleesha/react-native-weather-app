import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const getWeather = createAsyncThunk(
  'getWeather',
  async () => {
    try {
      // TODO: need to add user location (latitude, longitude)
      // for more info: https://open-meteo.com/en/docs
      const { data } = await axios.get('https://api.open-meteo.com/v1/forecast?latitude=6.9355&longitude=79.8487&current=temperature_2m,relative_humidity_2m,precipitation,rain,cloud_cover,wind_speed_10m,wind_direction_10m&timezone=auto&forecast_days=1')
      console.log('Data fetched')
      console.log(JSON.stringify(data, null, 2));
    
      return data
    } catch (error) {
      console.log(error);
    }
  }
)