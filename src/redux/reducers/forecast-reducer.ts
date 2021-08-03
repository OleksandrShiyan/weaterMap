import {ForecastAction, forecastState} from "../../types/redux-types/redux-types";
import {CLEAR_WEATHER_DATA, FETCH_WEATHER_DATA} from "../../utils/consts";


const initialState: forecastState = {
        list: null
        //     [{
        //     clouds:{
        //         all: 1
        //     },
        //     dt: 1,
        //     dt_txt: 'init 19:00:00',
        //     wind: {
        //         deg: 1,
        //         gust: 1,
        //         speed: 1
        //     },
        //     main: {
        //         feels_like: 1,
        //         grnd_level: 1,
        //         humidity: 1,
        //         pressure: 1,
        //         temp: 1,
        //         sea_level: 1,
        //         temp_kf: 1,
        //         temp_max: 1,
        //         temp_min: 1,
        //     },
        //     sys: {
        //         pob: 'init'
        //     },
        //     visibility: 1,
        //     weather: [{
        //         main: 'init',
        //         id: 1,
        //         description: 'init',
        //         icon: 'init'
        //     }],
        //     pop: 0
        //
        // }]
        ,
        city: {
            coords: {
                lat: 0,
                lon: 0
            },
            id: 1,
            country: 'init',
            name: 'init',
            population: 0,
            sunrise: 0,
            sunset: 0,
            timezone: 0,
        }
};

function forecastReducer(state = initialState, action: ForecastAction) {
    switch (action.type) {
        case FETCH_WEATHER_DATA:
            // console.log('action: ', action)
            return {
                ...state,
                list: action.payload.list,
                data: action.payload.city
            };case CLEAR_WEATHER_DATA:
            return {
                ...state,
                list: null,
                city: null
            }
        default:
            return state;
    }
}

export default forecastReducer;