import React from 'react';
import {useState, useEffect, useCallback, useMemo} from 'react';
import Page from './Page';
import {tools} from '../tools.js';
import SwitchButton from './SwitchButton';

const Tasks = ({amount}) => {
  const [displayedPages, setDisplayedPages] = useState(2)
  const [rerender, setRerender] = useState(false)

  for (let i = 0; i < amount; i++) {
    const pageKey = tools.getPageKey(i)
    if (!localStorage.getItem(pageKey)) {
      localStorage.setItem(pageKey, JSON.stringify(tools.getBlankTask(i)))
    } else if (i === 0) {
      tools.rewriteData(tools.getPageKey(0), (data) => {
        data.tasks = data.tasks.filter(t => t.value)
        return data
      })
    }
  }

  const updateData = useCallback((numberOfTimes) => {
    if (numberOfTimes < 1) return

    for (let i = 0; i < numberOfTimes; i++) {
      if (i >= amount) {
        tools.writeScore(null)
      } else {
        const pageKey = tools.getPageKey(i)
        const tasks = tools.getData(pageKey).tasks.filter(t => t.value !== '')
        const score = tasks.length === 0 ? null : tasks.map(t => 2*(+t.checked)-1).reduce((a, b) => a+b, 0)
        tools.writeScore(score)
      }
    }

    if (numberOfTimes >= amount) {
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

      const currentTime = ~~((Date.now() - new Date().getTimezoneOffset()*60*1000) / msInDay)
      let lastTime = +localStorage.getItem('lastUpdateTime')
      if (!lastTime) {
        lastTime = currentTime
        localStorage.setItem('lastUpdateTime', lastTime)
      }
      const deltaDays = currentTime-lastTime
      if (deltaDays >= 1) {
        localStorage.setItem('lastUpdateTime', currentTime)
        updateData(deltaDays)
      }

    })

    return () => {
      clearInterval(interval)
    }
  }, [msInDay, updateData])

  function yellPage(i, yellChildren=()=><></>) {
    return <Page pageKey={tools.getPageKey(i)} pageIndex={i} key={'pageN-'+i}>{yellChildren()}</Page>
  }
  return <div className="Tasks">
    {[...Array(displayedPages).fill(null).map((x, i) => {
      if (i === 1) {
        return yellPage(i, () => <SwitchButton switchIcon={displayedPages === amount} switchFunction={() => setDisplayedPages(displayedPages === amount ? 2 : amount)}/>)
      }
      return yellPage(i)
      //{if (i === 1) <SwitchButton switchIcon={displayedPages === amount} switchFunction={() => setDisplayedPages(displayedPages === amount ? 2 : amount)}/>}
    })]}
  </div>
}

export default Tasks;
