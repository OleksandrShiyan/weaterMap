import {ADD_FORECAST_REQUEST, UPDATE_VALID_FORECAST_REQUESTS} from "../../utils/consts";
import {cacheObj} from "../../types/redux-types/redux-types";

export function addForecastReqAC(payload: cacheObj) {
    return {
        type: ADD_FORECAST_REQUEST,
        payload
    }
}

export function updateValidForecastReqAC(payload: cacheObj[]) {
    return {
        type: UPDATE_VALID_FORECAST_REQUESTS,
        payload
    }
}
