import React from 'react';
// import {useState} from 'react';
import Task from './Task';

const TaskList = ({isDisabled, pageIndex, tasksData}) => {

  return <div className="TaskList">
    {[...tasksData.map((taskData, i)=> <Task isDisabled={isDisabled} taskData={taskData} pageIndex={pageIndex} taskIndex={i} key={pageIndex+'-task-'+i}/>)]}

  </div>
}

export default TaskList;
