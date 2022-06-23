import React from 'react';

const StatisticsDiv = ({text, value}) => {
  return <div className="StatisticsDiv">
    <p>{text + ': '}<span>{value}</span></p>
  </div>
}

export default StatisticsDiv;
