import { LOGIN_ROUTE, WEATHER_MAP_ROUTE } from '../utils/consts';
import Login from '../components/Authorization/Login';
import WeatherMap from '../components/WeatherMap/WeatherMap';

export const publicRoutes = [
  {
    path: LOGIN_ROUTE,
    Component: Login,
  },
];

export const privateRoutes = [
  {
    path: WEATHER_MAP_ROUTE,
    Component: WeatherMap,
  },
];