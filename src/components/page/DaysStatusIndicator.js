import React from 'react';
import {tools} from '../../tools.js';

const DaysStatusIndicator = ({style}) => {
  const amountOfIndicators = 5
  const dataArray = tools.getScore().slice(-amountOfIndicators-1)
  const dataArrayConverted = tools.convertScoreData(dataArray)

  return <div className="info-days" style={style}>
    {[...Array(dataArray.length-1).fill(null).map((_, i) => <div key={i} className="info-day" style={{
      borderRadius: '50%',
      backgroundColor: (()=>{
        const d = dataArrayConverted[i+1] - dataArrayConverted[i]
        return dataArray[i+1]===null ? tools.palette.light :
        d >= 0 ?
        tools.palette.blue : tools.palette.red
      })()

    }}></div>)]}
  </div>
}

export default DaysStatusIndicator;
