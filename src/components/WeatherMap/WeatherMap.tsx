import React, { useEffect, useState } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import axios from 'axios';
import ForecastModal from './ForecastModal/ForecastModal';
import { useDispatch, useSelector } from 'react-redux';
import {
  ADD_FORECAST_REQUEST,
  FETCH_WEATHER_DATA,
  UPDATE_VALID_FORECAST_REQUESTS,
} from '../../utils/consts';
import { HaversineInKM } from '../../utils/functions';
import { RootState } from '../../redux/store';

const containerStyle = {
  width: '100%',
  height: '93vh',
};

const apiKey = process.env.REACT_APP_OPENWEATHER_API;
const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API;

function WeatherMap() {
  const dispatch = useDispatch();

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: `${googleMapsApiKey}`,
  });

  const [center, setCenter] = useState({
    lat: 50,
    lng: 30,
  });

  const cache = useSelector((state: RootState) => state.cache);

  const [, setMap] = React.useState({ zoom: 4 });

  const onUnmount = React.useCallback(function callback() {
    setMap({ zoom: 5 });
  }, []);

  const onClick = (e: any) => {
    let cachedObj = { distance: -1, index: -1 };
    const meLat = e.latLng.lat();
    const meLong = e.latLng.lng();

    const validReq = cache.requests.filter((req) => Date.now() - req.timeStamp < 0);

    if (!(validReq.length === cache.requests.length)) {
      dispatch({
        type: UPDATE_VALID_FORECAST_REQUESTS,
        payload: validReq,
      });
    }

    validReq.forEach((req, index) => {
      const distance = HaversineInKM(meLat, meLong, req.coords.lat, req.coords.lng);
      if (
        distance < 20 &&
        (cachedObj.distance === -1 || (cachedObj.distance && cachedObj.distance > distance))
      ) {
        cachedObj = { index, distance };
      }
    });

    if (cachedObj.distance !== -1) {
      dispatch({ type: FETCH_WEATHER_DATA, payload: cache.requests[cachedObj.index] });
    } else {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${e.latLng.lat()}&lon=${e.latLng.lng()}&appid=${apiKey}&units=metric`,
        )
        .then((event) => {
          dispatch({ type: FETCH_WEATHER_DATA, payload: event.data });
          dispatch({
            type: ADD_FORECAST_REQUEST,
            payload: {
              list: event.data.list,
              timeStamp: Date.now() + 3600000,
              coords: { lat: e.latLng.lat(), lng: e.latLng.lng() },
            },
          });
        });
    }

    setForecast(true);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((e) => {
      setCenter({
        lat: e.coords.latitude,
        lng: e.coords.longitude,
      });
    });
  }, []);

  const [forecast, setForecast] = useState(false);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={8}
      onUnmount={onUnmount}
      onClick={onClick}
    >
      {forecast ? <ForecastModal setForecast={setForecast} /> : null}
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(WeatherMap);
