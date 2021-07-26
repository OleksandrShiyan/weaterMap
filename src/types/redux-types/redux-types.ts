export interface action {
  type: string;
  payload?: any;
}

enum UserActionTypes {
  FETCH_GOOGLE_USER = 'FETCH_GOOGLE_USER',
  FETCH_GOOGLE_USER_SUCCESS = 'FETCH_GOOGLE_USER_SUCCESS',
  FETCH_GOOGLE_USER_ERROR = 'FETCH_GOOGLE_USER_ERROR',
  FETCH_GOOGLE_AUTH_OBJ = 'FETCH_GOOGLE_AUTH_OBJ',
}

export interface FetchGoogleUserA {
  type: UserActionTypes.FETCH_GOOGLE_USER;
}

export interface FetchGoogleUserSuccessA {
  type: UserActionTypes.FETCH_GOOGLE_USER_SUCCESS;
  payload: any[];
}

export interface FetchGoogleUserErrorA {
  type: UserActionTypes.FETCH_GOOGLE_USER_ERROR;
  error: string;
}
export interface FetchGoogleAuthObjA {
  type: UserActionTypes.FETCH_GOOGLE_AUTH_OBJ;
  auth: any;
}

export type UserAction = FetchGoogleUserA | FetchGoogleUserSuccessA | FetchGoogleUserErrorA | FetchGoogleAuthObjA;

export interface authReducerState {
  login: string;
  isAuth: boolean;
  error: string | null;
  loading: boolean;
  auth: any
}