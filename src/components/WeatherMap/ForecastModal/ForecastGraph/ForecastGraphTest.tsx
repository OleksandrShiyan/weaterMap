import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import * as d3 from 'd3';
import { RootState } from '../../../../redux/store';
import style from '../ForecastModal.module.css';
import { forecastState } from '../../../../types/redux-types/redux-types';
import { debounce } from '@material-ui/core';

function getTextWidth(text: string, font: string): number {
  // @ts-ignore
  const canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement('canvas'));
  const context = canvas.getContext('2d');
  context.font = font;
  const metrics = context.measureText(text);
  return metrics.width;
}

const display = (blockWidth: number, blockHeight: number, forecast: forecastState) => {
  d3.selectAll('#forecast > *').remove();

  const width = blockWidth / 3;
  const height = blockHeight / 2;

  const textSize = Math.round(blockWidth / 100) + 2;
  const timeWidth = getTextWidth('19:00', `${textSize}px 'Times New Roman'`);
  const tempWidth = getTextWidth('30°', `${textSize + 2}px 'Times New Roman'`);

  if (forecast.list) {
    const dayForecast = forecast.list.slice(0, 8);

    const xScale = d3
      .scaleBand()
      .domain(dayForecast.map((field) => field.dt_txt))
      .rangeRound([0, width])
      .padding(0.15);
    const yScale = d3.scaleLinear().domain([-60, 45]).range([height, 0]);

    const differenceInTime = (xScale.bandwidth() - timeWidth)/2;
    const differenceInTemp = (xScale.bandwidth() - tempWidth)/2;

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
        .call(() =>{});

    const temp = container
      .selectAll('.bar')
      .data(dayForecast)
      .enter()
      .append('text')
      .attr('x', (data) => differenceInTemp + xScale(data.dt_txt)!)
      .attr('y', (data) => yScale(data.main.temp))
      .attr('font-size', textSize + 2)
      .text((data) => Math.round(data.main.temp) + '°');

    const time = container
      .selectAll('.bar')
      .data(dayForecast)
      .enter()
      .append('text')
      .attr('x', (data) => differenceInTime + xScale(data.dt_txt)!)
      .attr('y', height - 5)
      .attr('font-size', textSize)
      .text((data) => data.dt_txt.split(' ')[1].slice(0, 5));

    const line = container
        .append('path')
        .datum(dayForecast)
        .attr('fill', 'none')
        .attr('stroke', 'red')
        .attr("stroke-width", 1.5)
        .attr("stroke-linejoin", "round")
        .attr("d", d3.line<{ dt_txt: string; main: any }>()
            .curve(d3.curveBasis)
            .x((data) =>  (xScale(data.dt_txt)??0) + 18.5 )
            .y((data) =>   yScale(data.main.temp)*2 )
        )
    return (newWidth: any, newHeight: any) => {

      const width = newWidth / 3;
      const height = newHeight / 2;

      const textSize = Math.round(newWidth / 100) + 2;

      const timeWidth = getTextWidth('19:00', `${textSize}px 'Times New Roman'`);
      const tempWidth = getTextWidth('30°', `${textSize + 2}px 'Times New Roman'`);

      xScale.rangeRound([0, width]);
      yScale.rangeRound([height, 0]);

      const differenceInTime = (xScale.bandwidth() - timeWidth)/2;
      const differenceInTemp = (xScale.bandwidth() - tempWidth)/2;

      bars.attr('x', (data) => xScale(data.dt_txt)!)
          .attr('y', (data) => yScale(data.main.temp))
          .attr('width', xScale.bandwidth)
          .attr('height', (data) => height - yScale(data.main.temp));
      temp.attr('x', (data) => differenceInTemp + xScale(data.dt_txt)!)
          .attr('y', (data) => yScale(data.main.temp))
          .attr('font-size', textSize + 2);
      time.attr('x', (data) => differenceInTime + xScale(data.dt_txt)!)
          .attr('y', height - 5)
          .attr('font-size', textSize);
      line.attr("d", d3.line<{ dt_txt: string; main: any }>()
          .curve(d3.curveBasis)
          .x((data) =>  (xScale(data.dt_txt)??0) + 18.5 )
          .y((data) =>   yScale(data.main.temp)*2 )
      )
    }
  }
};

const ForecastGraphTest = () => {
  const forecast = useSelector((state: RootState) => state.forecast);

  useEffect(() => {
    const disResult = display(window.innerWidth, window.innerHeight, forecast);

    const resize = debounce(() => {
      if (disResult){
        disResult(window.innerWidth, window.innerHeight);
      }
    }, 1500);

    const onResize = () => {
      resize();
    }

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [forecast]);

  return <svg id="forecast"/>;
};

export default ForecastGraphTest;
