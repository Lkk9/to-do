import React from 'react';
import {useState, useEffect, useCallback} from 'react';
import Page from './Page';


const Tasks = ({amount}) => {
  const [page, setPage] = useState(0)
  const tasksPerPage = 2

  const getPagesData = useCallback(() => {
    const pagesDataArray = []
    for (let i = 0; i < amount; i++) {
      const pageKey = 'page-'+i
      let pageData = localStorage.getItem(pageKey)
      if (!pageData) {
        pageData = {
          id: i,
          tasks: [], // {value: str, checked: bool}
        }
        localStorage.setItem(pageKey, JSON.stringify(pageData))
      } else {
        pageData = JSON.parse(pageData)
      }
      pagesDataArray.push(pageData)
    }
    return pagesDataArray
  }, [amount])
  const [pagesData, setPagesData] = useState(getPagesData())

  useEffect(() => {
    const interval = setInterval(() => {

      for (let i = 0; i < amount; i++) {
        const pageKey = 'page-'+i
        const pageData = JSON.parse(localStorage.getItem(pageKey))
        if (i > 0) {
          pageData.id = i-1
          localStorage.setItem('page-'+(i-1), JSON.stringify(pageData))
        }
        if (i+1 === amount) localStorage.setItem(pageKey, JSON.stringify({id: i, tasks: []}))
      }
      setPagesData(getPagesData())

    }, 5000)


    return () => {
      clearInterval(interval)
    }
  }, [amount, getPagesData])


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
