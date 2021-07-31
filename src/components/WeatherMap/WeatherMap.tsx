import React, { useEffect, useState } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import axios from 'axios';
import ForecastModal from './ForecastModal/ForecastModal';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_FORECAST_REQUEST, FETCH_WEATHER_DATA } from '../../utils/consts';
import { HaversineInKM } from '../../utils/functions';
import { RootState } from '../../redux/store';

const containerStyle = {
  width: '100%',
  height: '93vh',
};


function WeatherMap() {
  const dispatch = useDispatch();

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    
  });

  const [center, setCenter] = useState({
    lat: 50,
    lng: 30,
  });

  const cache = useSelector((state: RootState) => state.cache);

  const [map, setMap] = React.useState({ zoom: 4 });

  // const onLoad = React.useCallback(function callback(map) {
  //   const bounds = new (window as any).google.maps.LatLngBounds();
  //   map.fitBounds(bounds);
  //   setMap(map);
  // }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap({ zoom: 5 });
  }, []);

  const onClick = (e: any) => {
    let cachedObj = { distance: -1, index: -1 };
    const meLat = e.latLng.lat();
    const meLong = e.latLng.lng();
    cache.requests.map((req, index) => {
      const distance = HaversineInKM(meLat, meLong, req.coords.lat, req.coords.lng);
      if (distance < 20) {
        if (cachedObj.distance === -1) {
          cachedObj = { index, distance };
        } else if (cachedObj.distance && cachedObj.distance > distance) {
          cachedObj = { index, distance };
        }
      }
    });

    if (cachedObj.distance !== -1) {
      dispatch({ type: FETCH_WEATHER_DATA, payload: cache.requests[cachedObj.index] });
      console.log('Data is cached!!');
    } else {
      console.log('Fetching new data');
      axios
        .get(
          `http://api.openweathermap.org/data/2.5/forecast?lat=${e.latLng.lat()}&lon=${e.latLng.lng()}&appid=${apiKey}&units=metric`,
        )
        .then((event) => {
          // console.log('forecast: ', event.data);
          dispatch({ type: FETCH_WEATHER_DATA, payload: event.data });
          dispatch({
            type: ADD_FORECAST_REQUEST,
            payload: {
              list: event.data.list,
              timeStamp: Date.now(),
              coords: { lat: e.latLng.lat(), lng: e.latLng.lng() },
            },
          });
        });
    }

    // console.log('event: ', e);
    // console.log('lat: ', e.latLng.lat());
    // console.log('lng: ', e.latLng.lng());
    //
    // console.log('timeStamp: ', Date.now());
    setForecast(true);
  };

  // const onZoom = () => {
  //   console.log('zoom map: ', map.zoom);
  // };

  // useEffect(() => {
  //   console.log('map: ', map);
  // }, [map]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((e) => {
      setCenter({
        lat: e.coords.latitude,
        lng: e.coords.longitude,
      });
      // console.log('geo:', e);
      // console.log('center', center)
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
      {/* Child components, such as markers, info windows, etc. */}
      <></>
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(WeatherMap);
