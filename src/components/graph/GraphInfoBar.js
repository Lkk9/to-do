import React from 'react';
import GraphLegend from './GraphLegend';
import GraphStatistics from './GraphStatistics';

const GraphInfoBar = () => (
  <div className="GraphInfoBar">
    <GraphStatistics />
    <GraphLegend />
  </div>
);

export default GraphInfoBar;
