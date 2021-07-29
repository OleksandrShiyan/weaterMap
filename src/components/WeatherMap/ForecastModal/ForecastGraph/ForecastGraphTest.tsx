import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import * as d3 from 'd3'
import { RootState } from '../../../../redux/store';
import style from '../ForecastModal.module.css'

const DUMMY_DATA = [
  { id: 1, temp: 22, time: "15:00" },
  { id: 2, temp: 26, time: "18:00" },
  { id: 3, temp: 28, time: "21:00" },
  { id: 4, temp: 32, time: "24:00" },
  { id: 5, temp: 23, time: "3:00" },
  { id: 6, temp: 26, time: "6:00" },
  { id: 7, temp: 27, time: "9:00" },
];

const ForecastGraphTest = () => {

  const forecast = useSelector((state: RootState) => state.forecast);

  const auth = useSelector((state: RootState) => state.auth);

  useEffect(() => {

      d3.selectAll('#forecast > *').remove()

    if (forecast.list) {
      const dayForecast = forecast.list.slice(0, 7)

      const xScale = d3.scaleBand().domain(dayForecast.map((field) => field.dt_txt)).rangeRound([0, 450]).padding(0.1);
      const yScale = d3.scaleLinear().domain([0, 35]).range([400, 0]);

      const container = d3.select('#forecast')
          .classed(style.container, true)

      const bars = container
          .selectAll('.bar')
          .data(dayForecast)
          .enter()
          .append('rect')
          .classed(style.bar, true)
          .attr('width', xScale.bandwidth)
          .attr('height', (data) => 400 - yScale(data.main.temp))
          .attr('x', data => xScale(data.dt_txt)!)
          .attr('y', data => yScale(data.main.temp))
    }


  }, []);

  // console.log('forecast: ', dayForecast.list.main.temp);
  // console.log('forecast: ', dayForecast.list.dt_txt);
  console.log('forecast: ', forecast.list);

  return <svg id="forecast"></svg>;
};

export default ForecastGraphTest;
