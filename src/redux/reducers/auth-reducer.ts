import { FETCH_GOOGLE_AUTH_OBJ } from '../../utils/consts';
import { authReducerState, UserAction } from '../../types/redux-types/redux-types';

const initialState: authReducerState = {
  login: 'init',
  isAuth: false,
  error: null,
  loading: true,
  auth: null,
};

function authReducer(state = initialState, action: UserAction) {
  switch (action.type) {
    case FETCH_GOOGLE_AUTH_OBJ:
      return {
        ...state,
        auth: action.auth,
        loading: false,
      };
    default:
      return state;
  }
}

export default authReducer;
