import React, { useCallback, useEffect, useState } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import ForecastModal from './ForecastModal/ForecastModal';
import { useDispatch, useSelector } from 'react-redux';
import { HaversineInKM } from '../../utils/functions';
import { addForecastReqAC, updateValidForecastReqAC } from '../../redux/actions/cache-AC';
import { fetchWeatherDataAC } from '../../redux/actions/forecast-AC';
import { weatherAPI } from '../../http/api';
import { weatherCache } from '../../selectors/cache-selectors';

const containerStyle = {
  width: '100%',
  height: '93vh',
};

const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API;

function WeatherMap() {
  const [center, setCenter] = useState({
    lat: 50,
    lng: 30,
  });

  const [, setMap] = useState({ zoom: 4 });

  const dispatch = useDispatch();

  const cache = useSelector(weatherCache);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: `${googleMapsApiKey}`,
  });

  const onUnmount = useCallback(function callback() {
    setMap({ zoom: 5 });
  }, []);

  const onClick = (e: any) => {
    let cachedObj = { distance: -1, index: -1 };
    const meLat = e.latLng.lat();
    const meLong = e.latLng.lng();

    const validReq = cache.requests.filter((req) => Date.now() - req.timeStamp < 0);

    if (!(validReq.length === cache.requests.length)) {
      dispatch(updateValidForecastReqAC(validReq));
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
      dispatch(fetchWeatherDataAC(cache.requests[cachedObj.index]));
    } else {
      weatherAPI.getForecast(e.latLng.lat(), e.latLng.lng()).then((event) => {
        dispatch(fetchWeatherDataAC(event.data));
        dispatch(
          addForecastReqAC({
            list: event.data.list,
            city: event.data.city,
            timeStamp: Date.now() + 3600000,
            coords: { lat: e.latLng.lat(), lng: e.latLng.lng() },
          }),
        );
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
  ) : null;
}

export default React.memo(WeatherMap);
