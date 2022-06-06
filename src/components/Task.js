import React from 'react';
import {useEffect, useCallback, useId} from 'react';

const Task = ({isMain, taskData, rewriteTask, removeTask, completeTask, taskIndex, pageKey}) => {
  const taskId = useId()
  const checkboxId = useId()

  useEffect(() => {
    document.getElementById(taskId).value = taskData.value
    document.getElementById(checkboxId).checked = taskData.checked
    document.getElementById(taskId).readOnly = isMain
  })

  return <div className="Task">
    <input type="checkbox" id={checkboxId} style={{display: isMain ? 'inline' : 'none'}} onChange={(e) => {
      completeTask(taskIndex, e.target.checked)
    }}/>
    <input type="text" id={taskId} className="TaskInput" onChange={(e) => {
      rewriteTask(taskIndex, e.target.value)
    }}/>
    <button style={{display: isMain ? 'none' : 'block'}} onClick={() => {
      removeTask(taskIndex)
    }}>delete</button>
  </div>
}

export default Task;
