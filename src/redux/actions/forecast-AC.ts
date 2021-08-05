import {FETCH_WEATHER_DATA} from "../../utils/consts";
import {forecastState} from "../../types/redux-types/redux-types";

export function fetchWeatherDataAC(payload: forecastState) {
    return {
        type: FETCH_WEATHER_DATA,
        payload
    }
}