import React, {useState, useEffect, useCallback, useMemo} from 'react';
import Page from './Page';
import {tools} from '../../tools.js';
import SwitchButton from './SwitchButton';
import './pageStyles.css';

const Tasks = ({amount}) => {
  const [displayedPages, setDisplayedPages] = useState(2)
  const [rerender, setRerender] = useState(false)

  for (let i = 0; i < amount; i++) {
    const pageKey = tools.getPageKey(i)
    if (!localStorage.getItem(pageKey)) {
      const blankPage = tools.getBlankPage(i)
      if (i === 0) blankPage.list.push(tools.getBlankTask('plan your next day'))
      localStorage.setItem(pageKey, JSON.stringify(blankPage))
    } else if (i === 0) {
      tools.rewriteData(tools.getPageKey(0), (data) => {
        data.list = data.list.filter(t => t.value)
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
        const tasks = tools.getData(pageKey).list.filter(l => l.type === 'task').filter(t => t.value !== '')
        const score = tasks.length === 0 ? null : tasks.map(t => 2*(+t.checked)-1).reduce((a, b) => a+b, 0)
        tools.writeScore(score)
      }
    }

    if (numberOfTimes >= amount) {
      for (let i = 0; i < amount; i++) {
        const pageKey = tools.getPageKey(i)
        tools.rewriteData(pageKey, (data) => {
          data = tools.getBlankPage(i)
          return data
        })
      }
    } else {
      for (let i = numberOfTimes; i < amount; i++) {
        const pageKey = tools.getPageKey(i)

        if (i+numberOfTimes >= amount) {
          tools.rewriteData(pageKey, (data) => {
            data = tools.getBlankPage(i)
            return data
          })
        } else {
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
  return <section className="Tasks">
    {[...Array(displayedPages).fill(null).map((x, i) => {
      if (i === 1) {
        return yellPage(i, () => <SwitchButton switchIcon={displayedPages === amount} switchFunction={() => setDisplayedPages(displayedPages === amount ? 2 : amount)}/>)
      }
      return yellPage(i)
    })]}
  </section>
}

export default Tasks;
