import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import * as d3 from 'd3'
import { RootState } from '../../../../redux/store';
import style from '../ForecastModal.module.css'
import {ForecastGraphP} from "../../../../types/component-types/component-types";

const DUMMY_DATA = [
  { id: 1, temp: 22, time: "15:00" },
  { id: 2, temp: 26, time: "18:00" },
  { id: 3, temp: 28, time: "21:00" },
  { id: 4, temp: 32, time: "24:00" },
  { id: 5, temp: 23, time: "3:00" },
  { id: 6, temp: 26, time: "6:00" },
  { id: 7, temp: 27, time: "9:00" },
];

const ForecastGraphTest = ({innerWidth, innerHeight}: ForecastGraphP) => {

  const width = innerWidth / 3;
  const height = innerHeight / 2;

  const textSize = Math.round(innerWidth/100) + 2;

  // console.log('450: ', width , ' 400: ' ,height)
  // console.log('textSize: ', textSize)

  const forecast = useSelector((state: RootState) => state.forecast);
  // if (forecast.list) {
  //   const time = forecast.list[0].dt_txt.split(' ')[1].slice(0, 5)
  //   console.log('time: ', time)
  // }

  const auth = useSelector((state: RootState) => state.auth);

  useEffect(() => {

      d3.selectAll('#forecast > *').remove()

    if (forecast.list) {
      const dayForecast = forecast.list.slice(0, 8)
      // console.log('day: ', dayForecast)

      const xScale = d3.scaleBand().domain(dayForecast.map((field) => field.dt_txt)).rangeRound([0, width]).padding(0.15);
      const yScale = d3.scaleLinear().domain([-60, 45]).range([height, 0]);

      const container = d3.select('#forecast')
          .classed(style.container, true)

      const bars = container
          .selectAll('.bar')
          .data(dayForecast)
          .enter()
          .append('rect')
          .classed(style.bar, true)
          .attr('width', xScale.bandwidth)
          .attr('height', (data) => height - yScale(data.main.temp))
          .attr('x', data => xScale(data.dt_txt)!)
          .attr('y', data => yScale(data.main.temp))

      const text = container
          .selectAll('.bar')
          .data(dayForecast)
          .enter()
          .append('text')
          .attr('x', data => 3 + xScale(data.dt_txt)!)
          .attr('y', data => yScale(data.main.temp))
          .text(data => Math.round(data.main.temp) + '°')

      const time = container
          .selectAll('.bar')
          .data(dayForecast)
          .enter()
          .append('text')
          .attr('x', data =>  xScale(data.dt_txt)!)
          .attr('y', (height - 5))
          .attr('font-size', textSize)
          .text(data => data.dt_txt.split(' ')[1].slice(0, 5))
    }


  }, [forecast, width]);

  // console.log('forecast: ', dayForecast.list.main.temp);
  // console.log('forecast: ', dayForecast.list.dt_txt);
  // console.log('forecast: ', forecast.list);

  return <svg id="forecast"></svg>;
};

export default ForecastGraphTest;
