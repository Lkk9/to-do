import React from 'react';
import {useState} from 'react';
import Task from './Task';
import {tools} from '../tools.js';

const TaskList = ({isMain, pageKey}) => {
  const [rerender, setRerender] = useState(false)

  const rewriteTask = (index, text) => {
    tools.rewriteData(pageKey, (data) => {
      data.tasks[index].value = text
      return data
    })
    setRerender(!rerender)
  }
  const removeTask = (index) => {
    tools.rewriteData(pageKey, (data) => {
      data.tasks.splice(index, 1)
      return data
    })
    setRerender(!rerender)
  }
  const completeTask = (index, state) => {
    tools.rewriteData(pageKey, (data) => {
      data.tasks[index].checked = state
      return data
    })
    setRerender(!rerender)
  }

  return <div className="TaskList">
    {[...tools.getData(pageKey).tasks.map((taskData, i)=> <Task
      isMain={isMain}
      rewriteTask={rewriteTask}
      removeTask={removeTask}
      completeTask={completeTask}
      taskIndex={i}
      taskData={taskData}
      key={'-task-'+i}/>)]}
  </div>
}

export default TaskList;
