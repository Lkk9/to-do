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
    <label className="Task-icon" style={{display: !isMain ? 'none' : 'flex'}}>
      <input style={{display: 'none'}} type="checkbox" id={checkboxId} onChange={(e) => {
        completeTask(taskIndex, e.target.checked)
      }}/>
      <svg className="icon checkbox-icon"
      version="1.1"
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 17.837 17.837"
      style={{enableBackground: "new 0 0 17.837 17.837"}}>
        <g>
        	<path d="M16.145,2.571c-0.272-0.273-0.718-0.273-0.99,0L6.92,10.804l-4.241-4.27
            c-0.272-0.274-0.715-0.274-0.989,0L0.204,8.019c-0.272,0.271-0.272,0.717,0,0.99l6.217,6.258c0.272,0.271,0.715,0.271,0.99,0
        		L17.63,5.047c0.276-0.273,0.276-0.72,0-0.994L16.145,2.571z"/>
        </g>
      </svg>
    </label>

    <input
    placeholder="new task"
    wrap="off"
    row="6"
    id={taskId}
    className="Task-input"
    onChange={(e) => {
        rewriteTask(taskIndex, e.target.value)
    }}
    />

    <label className="Task-icon" style={{display: isMain ? 'none' : 'flex'}}>
      <button style={{display: 'none'}} onClick={() => {
        removeTask(taskIndex)
      }}>
      </button>
      <svg style={{enableBackground:"new 0 0 95.939 95.939"}}
      className="icon remove-icon"
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
  </div>
}

export default Task;
