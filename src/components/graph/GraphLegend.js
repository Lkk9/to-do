import React from 'react';
import GraphLegendNote from './GraphLegendNote';
import {tools} from '../../tools.js';

const GraphLegend = () => (
  <div className="GraphLegend">
    <GraphLegendNote text="blue" color={tools.palette.blue}/>
    <GraphLegendNote text="red" color={tools.palette.red}/>
    <GraphLegendNote text="light" color={tools.palette.light}/>
  </div>
);

export default GraphLegend;
