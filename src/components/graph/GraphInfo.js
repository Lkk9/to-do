import React from 'react';
import Graph from './Graph';
import GraphInfoBar from './GraphInfoBar';
import './graphStyles.css';

const GraphInfo = () => (
  <section className="GraphInfo">
    <Graph />
    <GraphInfoBar />
  </section>
);

export default GraphInfo;
