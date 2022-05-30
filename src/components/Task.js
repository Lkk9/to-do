import React from 'react';
import {useEffect} from 'react';

const Task = ({taskData, pageIndex, taskIndex}) => {
  const pageKey = 'page-'+pageIndex
  const taskId = pageIndex+'-task-'+taskIndex
  const checkboxId = pageIndex+'-checkbox-'+taskIndex

  useEffect(() => {
    document.getElementById(taskId).value = taskData.value
    document.getElementById(checkboxId).checked = taskData.checked
  })

  return <div className="Task">
    <input type="checkbox" id={checkboxId} style={{display: pageIndex === 0 ? 'inline' : 'none'}} onChange={(e) => {
      const pageData = JSON.parse(localStorage.getItem(pageKey))
      pageData.tasks[taskIndex].checked = e.target.checked

      localStorage.setItem(pageKey, JSON.stringify(pageData))
    }}/>
    <input type="text" id={taskId} className="TaskInput" onChange={(e) => {
      const pageData = JSON.parse(localStorage.getItem(pageKey))
      pageData.tasks[taskIndex].value = e.target.value

      localStorage.setItem(pageKey, JSON.stringify(pageData))
    }}/>
  </div>
}

export default Task;
