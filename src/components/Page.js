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
      <label className="Task-icon" style={{display: isMain ? 'none' : 'flex'}}>
        <button style={{display: 'none'}} onClick={() => {

          tools.rewriteData(pageKey, (data) => {
            data.tasks.push({
              value: '',
              checked: false
            })
            return data
          })
          setRerender(!rerender)

        }}></button>
        <svg style={{enableBackground:"new 0 0 95.939 95.939"}}
        className="icon add-icon"
        version="1.1"
        id="Capa_1"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="95.939px"
        height="95.939px"
        viewBox="0 0 95.939 95.939">
          <g>
            <path d="M62.819,47.97l32.533-32.534c0.781-0.781,0.781-2.047,0-2.828L83.333,0.586C82.958,0.211,82.448,0,81.919,0
              c-0.53,0-1.039,0.211-1.414,0.586L47.97,33.121L15.435,0.586c-0.75-0.75-2.078-0.75-2.828,0L0.587,12.608
              c-0.781,0.781-0.781,2.047,0,2.828L33.121,47.97L0.587,80.504c-0.781,0.781-0.781,2.047,0,2.828l12.02,12.021
              c0.375,0.375,0.884,0.586,1.414,0.586c0.53,0,1.039-0.211,1.414-0.586L47.97,62.818l32.535,32.535
              c0.375,0.375,0.884,0.586,1.414,0.586c0.529,0,1.039-0.211,1.414-0.586l12.02-12.021c0.781-0.781,0.781-2.048,0-2.828L62.819,47.97
              z"/>
          </g>
        </svg>
      </label>
    </PageBanner>
  </div>
}

export default Page;
