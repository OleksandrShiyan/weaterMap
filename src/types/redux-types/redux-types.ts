export interface action {
  type: string;
  payload?: any;
}

enum UserActionTypes {
  FETCH_GOOGLE_AUTH_OBJ = 'FETCH_GOOGLE_AUTH_OBJ',
}

enum ForecastActionTypes {
  FETCH_WEATHER_DATA = 'FETCH_WEATHER_DATA'
}

enum CacheActionTypes {
  ADD_FORECAST_REQUEST = 'ADD_FORECAST_REQUEST',
  UPDATE_VALID_FORECAST_REQUESTS = 'UPDATE_VALID_FORECAST_REQUESTS',
}

export interface FetchGoogleAuthObjA {
  type: UserActionTypes.FETCH_GOOGLE_AUTH_OBJ;
  auth: any;
}

export interface FetchWeatherDataA {
  type: ForecastActionTypes.FETCH_WEATHER_DATA;
  payload: forecastState;
}

export interface AddForecastRequestA {
  type: CacheActionTypes.ADD_FORECAST_REQUEST;
  payload: cacheObj;
}

export interface DeleteForecastRequestA {
  type: CacheActionTypes.UPDATE_VALID_FORECAST_REQUESTS;
  payload: cacheObj[];
}

export type UserAction = FetchGoogleAuthObjA;

export type ForecastAction = FetchWeatherDataA;

export type CacheAction = AddForecastRequestA | DeleteForecastRequestA;

export interface authReducerState {
  login: string;
  isAuth: boolean;
  error: string | null;
  loading: boolean;
  auth: any;
}

export interface forecastState {
  city: cityObj | null;
  list: listObj[] | null;
}

interface cityObj {
  coords: {
    lat: number;
    lon: number;
  };
  country: string;
  id: number;
  name: string;
  population: number;
  sunrise: number;
  sunset: number;
  timezone: number;
}

interface listObj {
  clouds: {
    all: number;
  };
  dt: number;
  dt_txt: string;
  main: mainObj;
  pop: number;
  sys: {
    pob: string;
  };
  visibility: number;
  weather: [weatherObj];
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
}

interface mainObj {
  feels_like: number;
  grnd_level: number;
  humidity: number;
  pressure: number;
  sea_level: number;
  temp: number;
  temp_kf: number;
  temp_max: number;
  temp_min: number;
}

interface weatherObj {
  description: string;
  icon: string;
  id: number;
  main: string;
}

export interface cacheState {
  requests: cacheObj[];
}

export interface cacheObj {
  timeStamp: number;
  coords: {
    lat: number;
    lng: number;
  };
  city: cityObj;
  list: listObj[] | null;
}
