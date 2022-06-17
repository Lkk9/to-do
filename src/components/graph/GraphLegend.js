import React from 'react';
import GraphLegendNote from './GraphLegendNote';
import {tools} from '../../tools.js';

const GraphLegend = () => (
  <div className="GraphLegend">
    <GraphLegendNote text="More tasks completed" color={tools.palette.blue}/>
    <GraphLegendNote text="Fewer tasks completed" color={tools.palette.red}/>
    <GraphLegendNote text="Completed zero tasks" color={tools.palette.light}/>
  </div>
);

export default GraphLegend;
