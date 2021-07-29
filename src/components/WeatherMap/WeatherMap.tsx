import React, { useEffect, useState } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import axios from 'axios';
import ForecastModal from './ForecastModal/ForecastModal';
import {useDispatch} from "react-redux";
import {FETCH_WEATHER_DATA} from "../../utils/consts";

const containerStyle = {
  width: '100%',
  height: '93vh',
};

// http://maps.openweathermap.org/maps/2.0/weather/TA2/8/50/30?appid=c3256a23f4717a90ea226483514e6cfa

const apiKey = 'c3256a23f4717a90ea226483514e6cfa';

function WeatherMap() {

  const dispatch = useDispatch();

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyBnHITdRGqi7e71Qhc6-sgSaF8y8H0-LBg',
  });
  
  const [center, setCenter] = useState({
    lat: 50,
    lng: 30,
  })

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
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/forecast?lat=${e.latLng.lat()}&lon=${e.latLng.lng()}&appid=${apiKey}&units=metric`,
      )
      .then((e) => {
        // console.log('forecast: ', e.data);
        dispatch({type: FETCH_WEATHER_DATA, payload: e.data})
      });
    // console.log('event: ', e);
    // console.log('lat: ', e.latLng.lat());
    // console.log('lng: ', e.latLng.lng());
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
