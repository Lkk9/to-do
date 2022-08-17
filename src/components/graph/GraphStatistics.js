import React from 'react';
import StatisticsDiv from './StatisticsDiv';
import {tools} from '../../tools.js';

const GraphStatistics = () => {
  const scoreArray = tools.getScore().filter(x => x !== null)

  const averageScore = (scoreArray.reduce((a, b) => a + b, 0) / scoreArray.length).toFixed(2)
  const bestSequence = (() => {
    let result = 0
    let lastResult = result

    let lastScore = 0
    for (let i = 1; i < scoreArray.length; i++) {
      const score = scoreArray[i]

      if (score >= lastScore)
        lastResult++
      else
        lastResult = 0

      if (lastResult > result)
        result = lastResult

      lastScore = score
    }
    return result
  })()
  const bestScore = Math.max(...scoreArray)
  const lastScore = scoreArray[scoreArray.length - 1]

  return <div className="GraphStatistics">
    <StatisticsDiv text={'average'} value={averageScore} />
    <StatisticsDiv text={'best sequence'} value={bestSequence} />
    <StatisticsDiv text={'best score'} value={bestScore} />
    <StatisticsDiv text={'last score'} value={lastScore} />
  </div>
}

export default GraphStatistics;
