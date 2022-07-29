import React from 'react';
import StatisticsDiv from './StatisticsDiv';
import {tools} from '../../tools.js';

const GraphStatistics = () => {
  const scoreArray = tools.getScore().filter(x => x !== null)
  const roundTo = 100

  // const remainingTasks = tools.getData(tools.getPageKey(0)).list.filter(l => l.type === 'task').filter(t => !t.checked).length
  const averageScore = (~~(scoreArray.reduce((a, b) => a + b, 0) / scoreArray.length * roundTo))/roundTo
  const progressPerDay = (~~(scoreArray[scoreArray.length-1] / (scoreArray.length-1) * roundTo))/roundTo//(~~((scoreArray.map((n, i, a) => n - (a[i-1] || 0)).reduce((a, b) => a + b, 0)/(scoreArray.length-1))*roundTo))/roundTo
  const bestScore = Math.max(...scoreArray)

  return <div className="GraphStatistics">
    <StatisticsDiv text={'average'} value={averageScore} />
    <StatisticsDiv text={'progress per day'} value={progressPerDay+' task'} />
    <StatisticsDiv text={'best score'} value={bestScore} />
  </div>
}

export default GraphStatistics;
