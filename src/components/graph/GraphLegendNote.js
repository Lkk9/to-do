import React from 'react';

const GraphLegendNote = ({text, color}) => (
  <div className="GraphLegendNote">
    <div className="GraphLegendNote-color" style={{backgroundColor: color}}>a</div>
    <div className="GraphLegendNote-text">
      {text}
    </div>
  </div>
);

export default GraphLegendNote;
