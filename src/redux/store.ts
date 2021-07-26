import {combineReducers, compose, createStore} from "redux";
import authReducer from "./reducers/auth-reducer";

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}



let reducers = combineReducers({
    auth: authReducer
});

export type RootState = ReturnType<typeof reducers>

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers());

export default store