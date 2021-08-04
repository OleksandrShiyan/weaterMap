import {ADD_FORECAST_REQUEST, UPDATE_VALID_FORECAST_REQUESTS} from '../../utils/consts';
import { CacheAction, cacheState } from '../../types/redux-types/redux-types';

const initialState: cacheState = {
  requests: [],
};

function cacheReducer(state = initialState, action: CacheAction) {
  switch (action.type) {
    case ADD_FORECAST_REQUEST:
      return {
        ...state,
        requests: [...state.requests, action.payload],
      };
    case UPDATE_VALID_FORECAST_REQUESTS:
      return {
        ...state,
        requests: [...action.payload]
      };
    default:
      return state;
  }
}

export default cacheReducer;
