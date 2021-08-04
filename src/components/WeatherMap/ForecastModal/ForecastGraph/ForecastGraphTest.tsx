import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import * as d3 from 'd3';
import { RootState } from '../../../../redux/store';
import style from '../ForecastModal.module.css';
import { forecastState } from '../../../../types/redux-types/redux-types';
import { debounce } from '@material-ui/core';

const display = (blockWidth: number, blockHeight: number, forecast: forecastState) => {
  d3.selectAll('#forecast > *').remove();

  const width =  blockWidth < 450 ? blockWidth : 450;
  const height = blockHeight / 2;

  if (forecast.list) {
    const dayForecast = forecast.list.slice(0, 8);

    const xScale = d3
      .scaleBand()
      .domain(dayForecast.map((field) => field.dt_txt))
      .rangeRound([0, width])
      .padding(0.15);
    const yScale = d3.scaleLinear().domain([-60, 45]).range([height, 0]);

    const container = d3.select('#forecast').classed(style.container, true);

    const bars = container
      .selectAll('.bar')
      .data(dayForecast)
      .enter()
      .append('rect')
      .classed(style.bar, true)
      .attr('width', xScale.bandwidth)
      .attr('height', (data) => height - yScale(data.main.temp))
      .attr('x', (data) => xScale(data.dt_txt)!)
      .attr('y', (data) => yScale(data.main.temp))
      .call(() => {});

    const temp = container
      .selectAll('.bar')
      .data(dayForecast)
      .enter()
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('x', (data) => (xScale.bandwidth() / 2) + xScale(data.dt_txt)!)
      .attr('y', (data) => yScale(data.main.temp))
      .text((data) => Math.round(data.main.temp) + '°');

    const time = container
      .selectAll('.bar')
      .data(dayForecast)
      .enter()
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('x', (data) => (xScale.bandwidth() / 2) + xScale(data.dt_txt)!)
      .attr('y', height - 5)
      .classed(style.time, true)
      .text((data) => data.dt_txt.split(' ')[1].slice(0, 5));

    const line = container
      .append('path')
      .datum(dayForecast)
      .attr('fill', 'none')
      .attr('stroke', 'red')
      .attr('stroke-width', 1.5)
      .attr('stroke-linejoin', 'round')
      .attr(
        'd',
        d3
          .line<{ dt_txt: string; main: any }>()
          .curve(d3.curveBasis)
          .x((data) => (xScale(data.dt_txt) ?? 0) + 18.5)
          .y((data) => yScale(data.main.temp) * 2),
      );
    return (newWidth: any, newHeight: any) => {
      const width = newWidth < 450 ? newWidth : 450;
      const height = newHeight / 2;

      xScale.rangeRound([0, width]);
      yScale.rangeRound([height, 0]);

      bars
        .attr('x', (data) => xScale(data.dt_txt)!)
        .attr('y', (data) => yScale(data.main.temp))
        .attr('width', xScale.bandwidth)
        .attr('height', (data) => height - yScale(data.main.temp));
      temp
        .attr('x', (data) => (xScale.bandwidth() / 2) + xScale(data.dt_txt)!)
        .attr('y', (data) => yScale(data.main.temp))
      time
        .attr('x', (data) => (xScale.bandwidth() / 2) + xScale(data.dt_txt)!)
        .attr('y', height - 5)
      line.attr(
        'd',
        d3
          .line<{ dt_txt: string; main: any }>()
          .curve(d3.curveBasis)
          .x((data) => (xScale(data.dt_txt) ?? 0) + 9)
          .y((data) => yScale(data.main.temp) * 2),
      );
    };
  }
};

const ForecastGraphTest = () => {
  const forecast = useSelector((state: RootState) => state.forecast);
  useEffect(() => {
    const disResult = display(window.innerWidth, window.innerHeight, forecast);

    const resize = debounce(() => {
      if (disResult) {
        disResult(window.innerWidth, window.innerHeight);
      }
    }, 300);

    const onResize = () => {
      resize();
    };

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, [forecast]);

  return <svg id="forecast" />;
};

export default ForecastGraphTest;
