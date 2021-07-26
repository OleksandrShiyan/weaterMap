import {
  FETCH_GOOGLE_AUTH_OBJ,
  FETCH_GOOGLE_USER,
  FETCH_GOOGLE_USER_ERROR,
  FETCH_GOOGLE_USER_SUCCESS,
} from '../../utils/consts';
import { authReducerState, UserAction } from '../../types/redux-types/redux-types';

const initialState: authReducerState = {
  login: 'init',
  isAuth: false,
  error: null,
  loading: true,
  auth: null
};

function authReducer(state = initialState, action: UserAction) {
  switch (action.type) {
    case FETCH_GOOGLE_AUTH_OBJ:
      // console.log('action: ', action)
      return {
        ...state,
        auth: action.auth,
        loading: false
      };case FETCH_GOOGLE_USER:
      return {
        ...state,
      };
    case FETCH_GOOGLE_USER_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case FETCH_GOOGLE_USER_ERROR:
      return {
        ...state,
      };
    default:
      return state;
  }
}

export default authReducer;
