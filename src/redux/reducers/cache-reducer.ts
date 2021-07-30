import { ADD_FORECAST_REQUEST, DELETE_FORECAST_REQUEST } from '../../utils/consts';
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
    case DELETE_FORECAST_REQUEST:
      return {
        ...state,
      };
    default:
      return state;
  }
}

export default cacheReducer;