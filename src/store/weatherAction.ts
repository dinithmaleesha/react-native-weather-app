import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const getWeather = createAsyncThunk(
  'getWeather',
  async () => {
    try {
      const { data } = await axios.get('')
      console.log('Data fetched')

      return data
    } catch (error) {
      console.log(error);
    }
  }
)