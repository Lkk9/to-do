import React from 'react';
import {useState} from 'react';
import PageBanner from './PageBanner';
import TaskList from './TaskList';

const Page = ({pageData, pageIndex}) => {
  const pageKey = 'page-'+pageIndex
  const [rerender, setRerender] = useState(false)

  const weekday = new Date(new Date().setDate(new Date().getDate() + pageIndex)).toLocaleDateString('en-US', {weekday: 'long'})

  return <div className="Page">
    <PageBanner className="PageHeader">
    {weekday}
    </PageBanner>
    <TaskList isDisabled={pageIndex === 0}  tasksData={pageData.tasks} pageIndex={pageIndex}/>
    <PageBanner className="PageFooter">
      <button style={{display: pageIndex === 0 ? 'none' : 'block'}} onClick={() => {
        pageData.tasks.push({
          value: '',
          checked: false
        })
        setRerender(!rerender)

        localStorage.setItem(pageKey, JSON.stringify(pageData))
      }}>
        add task
      </button>
    </PageBanner>
  </div>
}

export default Page;
