import React from 'react';
import {useState, useEffect, useCallback, useMemo} from 'react';
import Page from './Page';
import blankTask from './variables.js';


const Tasks = ({amount}) => {
  const [page, setPage] = useState(0)
  const tasksPerPage = 2

  const getPagesData = useCallback(() => {
    const pagesDataArray = []
    for (let i = 0; i < amount; i++) {
      const pageKey = 'page-'+i
      let pageData = localStorage.getItem(pageKey)
      if (!pageData) {
        pageData = blankTask(i)

        localStorage.setItem(pageKey, JSON.stringify(pageData))
      } else {
        pageData = JSON.parse(pageData)
      }
      pagesDataArray.push(pageData)
    }
    return pagesDataArray
  }, [amount])

  const updateData = useCallback((numberOfTimes) => {
    if (numberOfTimes < 1) return
    else if (numberOfTimes >= amount) {
      for (let i = 0; i < amount; i++) {
        const pageKey = 'page-'+i
        localStorage.setItem(pageKey, JSON.stringify(blankTask(i)))
      }
    } else {
      for (let i = numberOfTimes; i < amount; i++) {
        const pageKey = 'page-'+i
        const pageData = JSON.parse(localStorage.getItem(pageKey))

        const currentId = i-numberOfTimes
        pageData.id = currentId
        localStorage.setItem('page-'+currentId, JSON.stringify(pageData))

        if (i+numberOfTimes >= amount) localStorage.setItem(pageKey, JSON.stringify(blankTask(i)))
      }
    }
    setPagesData(getPagesData())
  }, [amount, getPagesData])

  const [pagesData, setPagesData] = useState(getPagesData())
  const msInDay = useMemo(() => 24*60*60*1000, [])

  useEffect(() => {
    const interval = setInterval(() => {

      const currentTime = Date.now()//~~(Date.now() / msInDay)
      let lastTime = localStorage.getItem('lastUpdateTime')
      if (!lastTime) {
        lastTime = currentTime
        localStorage.setItem('lastUpdateTime', lastTime)
      }
      const deltaDays = currentTime-lastTime
      if (deltaDays >= 3000) {
        localStorage.setItem('lastUpdateTime', currentTime)
        updateData(1)
      }

    })

    return () => {
      clearInterval(interval)
    }
  }, [updateData, msInDay])




  return <div onWheel={(e) => {
    let nextPage = page + Math.sign(e.deltaY)
    nextPage = nextPage < 0 ? 0 : nextPage > Math.ceil(amount/tasksPerPage)-1 ? Math.ceil(amount/tasksPerPage)-1 : nextPage
    setPage(nextPage)
    setPagesData(getPagesData())
  }} className="Tasks" style={{gridTemplateColumns: `repeat(${tasksPerPage}, 1fr)`}}>
    {[...pagesData.splice(tasksPerPage*page, tasksPerPage).map(pageData => <Page pageData={pageData} pageIndex={pageData.id} key={'page-'+pageData.id} />)]}
  </div>
}

export default Tasks;
