import React from 'react';
import Graph from './Graph';
import GraphInfoBar from './GraphInfoBar';
import './graphStyles.css';

const GraphInfo = () => (
  <div className="GraphInfo">
    <Graph />
    <GraphInfoBar />
  </div>
);

export default GraphInfo;
