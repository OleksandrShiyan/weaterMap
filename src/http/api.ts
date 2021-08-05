import axios from "axios";
import {WEATHER_MAP_URL} from "../utils/consts";

const apiKey = process.env.REACT_APP_OPENWEATHER_API;

export const weatherAPI = {
  getForecast(lat: number, lon: number) {
    return axios.get(`${WEATHER_MAP_URL}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
  },
};