import { ForecastAction, forecastState } from '../../types/redux-types/redux-types';
import { CLEAR_WEATHER_DATA, FETCH_WEATHER_DATA } from '../../utils/consts';

const initialState: forecastState = {
  list: null,
  city: {
    coords: {
      lat: 0,
      lon: 0,
    },
    id: 1,
    country: 'init',
    name: 'init',
    population: 0,
    sunrise: 0,
    sunset: 0,
    timezone: 0,
  },
};

function forecastReducer(state = initialState, action: ForecastAction) {
  switch (action.type) {
    case FETCH_WEATHER_DATA:
      return {
        ...state,
        list: action.payload.list,
        data: action.payload.city,
      };
    case CLEAR_WEATHER_DATA:
      return {
        ...state,
        list: null,
        city: null,
      };
    default:
      return state;
  }
}

export default forecastReducer;