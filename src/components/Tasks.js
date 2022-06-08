import React from 'react';
import {useState, useEffect, useCallback, useMemo} from 'react';
import Page from './Page';
import {tools} from '../tools.js';

const Tasks = ({amount}) => {
  const [rerender, setRerender] = useState(false)

  for (let i = 0; i < amount; i++) {
    const pageKey = tools.getPageKey(i)
    if (!localStorage.getItem(pageKey)) {
      localStorage.setItem(pageKey, JSON.stringify(tools.getBlankTask(i)))
    }
  }

  const updateData = useCallback((numberOfTimes) => {
    if (numberOfTimes < 1) return
    else if (numberOfTimes >= amount) {
      for (let i = 0; i < amount; i++) {
        const pageKey = tools.getPageKey(i)
        localStorage.setItem(pageKey, JSON.stringify(tools.getBlankTask(i)))
      }
    } else {
      for (let i = numberOfTimes; i < amount; i++) {
        const pageKey = tools.getPageKey(i)

        if (i+numberOfTimes >= amount)
          localStorage.setItem(pageKey, JSON.stringify(tools.getBlankTask(i)))
        else {
          const pageData = JSON.parse(localStorage.getItem(pageKey))
          const currentId = i-numberOfTimes
          pageData.id = currentId
          localStorage.setItem(tools.getPageKey(currentId), JSON.stringify(pageData))
        }

      }
    }
    setRerender(!rerender)
  }, [amount, rerender])

  const msInDay = useMemo(() => 24*60*60*1000, [])
  useEffect(() => {
    const interval = setInterval(() => {

      const currentTime = ~~(Date.now() / msInDay)
      let lastTime = localStorage.getItem('lastUpdateTime')
      if (!lastTime) {
        lastTime = currentTime
        localStorage.setItem('lastUpdateTime', lastTime)
      }
      const deltaDays = currentTime-lastTime
      if (deltaDays >= 1) {
        localStorage.setItem('lastUpdateTime', currentTime)
        tools.setScore(
          tools.getScore()
          +
          tools.getData(tools.getPageKey(0))
          .tasks
          .map(t => t.checked ? 1 : -1)
          .reduce((a, b) => a + b, 0)
        )
        updateData(deltaDays)
      }

    })

    return () => {
      clearInterval(interval)
    }
  }, [msInDay, updateData])


  return <div className="Tasks">
    {[...Array(amount).fill(null).map((x, i) => <Page pageKey={tools.getPageKey(i)} pageIndex={i} key={'pageN-'+i} />)]}
  </div>
}

export default Tasks;
