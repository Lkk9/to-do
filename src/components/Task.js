import React from 'react';
import {useEffect, useId} from 'react';

const Task = ({isMain, taskData, rewriteTask, removeTask, completeTask, taskIndex}) => {
  const taskId = useId()
  const checkboxId = useId()

  useEffect(() => {
    document.getElementById(taskId).value = taskData.value
    document.getElementById(checkboxId).checked = taskData.checked
    document.getElementById(taskId).readOnly = isMain
  })

  return <div className="Task">
    <label className="Task-label" style={{display: !isMain ? 'none' : 'block'}}>
      <input type="checkbox" id={checkboxId} onChange={(e) => {
        completeTask(taskIndex, e.target.checked)
      }}/>
      <div className="Task-checkbox"></div>
    </label>
      <textarea wrap="off" rows="1" id={taskId} className="Task-input" onChange={(e) => {
        rewriteTask(taskIndex, e.target.value)
      }}></textarea>
    <button style={{display: isMain ? 'none' : 'block'}} onClick={() => {
      removeTask(taskIndex)
    }}>delete</button>
  </div>
}

export default Task;
