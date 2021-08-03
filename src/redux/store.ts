import { combineReducers, compose, createStore } from 'redux';
import authReducer from './reducers/auth-reducer';
import forecastReducer from './reducers/forecast-reducer';
import cacheReducer from './reducers/cache-reducer';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const reducersObj = {
  auth: authReducer,
  forecast: forecastReducer,
  cache: cacheReducer,
};

let reducers = combineReducers(reducersObj);

export type RootState = ReturnType<typeof reducers>;

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers());

export default store;
