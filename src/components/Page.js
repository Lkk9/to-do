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
      <div className="score-info" style={{display: !isMain ? 'none' : 'block'}}>
        Score: {tools.getScore()}
      </div>
      <button className=" add-task-btn" style={{display: isMain ? 'none' : 'block'}} onClick={() => {

        tools.rewriteData(pageKey, (data) => {
          data.tasks.push({
            value: '',
            checked: false
          })
          return data
        })
        setRerender(!rerender)

      }}></button>
    </PageBanner>
  </div>
}

export default Page;
