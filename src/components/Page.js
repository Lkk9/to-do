import React from 'react';
import {useState} from 'react';
import PageBanner from './PageBanner';
import TaskList from './TaskList';
import {tools} from '../tools.js';

const Page = ({pageKey, pageIndex}) => {

  const isMain = pageIndex === 0
  const [rerender, setRerender] = useState(false)
  const weekday = new Date(new Date().setDate(new Date().getDate() + pageIndex)).toLocaleDateString('en-US', {weekday: 'long'})

  return <div className="Page">
    <PageBanner className="PageHeader">
    {weekday}
    </PageBanner>
    <TaskList isMain={isMain} pageKey={pageKey}/>
    <PageBanner className="PageFooter">
      <button style={{display: isMain ? 'none' : 'block'}} onClick={() => {

        tools.rewriteData(pageKey, (data) => {
          data.tasks.push({
            value: '',
            checked: false
          })
          return data
        })
        setRerender(!rerender)

      }}>
        add task
      </button>
    </PageBanner>
  </div>
}

export default Page;
