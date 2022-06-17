import React, {useState} from 'react';
import {tools} from '../../../tools.js';
import Task from './task/Task';
import Note from './note/Note';
import './listStyles.css';

const List = ({isMain, pageKey}) => {

  const [rerender, setRerender] = useState(false)

  const rewriteListItem = (index, text) => {
    tools.rewriteData(pageKey, (data) => {
      data.list[index].value = text
      return data
    })
    setRerender(!rerender)
  }
  const removeListItem = (index) => {
    tools.rewriteData(pageKey, (data) => {
      data.list.splice(index, 1)
      return data
    })
    setRerender(!rerender)
  }
  const completeTask = (index, state) => {
    tools.rewriteData(pageKey, (data) => {
      data.list[index].checked = state
      return data
    })
    setRerender(!rerender)
  }
  const shiftNote = (index, shift) => {
    tools.rewriteData(pageKey, (data) => {
      const nextItem = data.list[index+shift]
      const currentItem = data.list[index]
      if (nextItem) {
        data.list[index] = nextItem
        data.list[index+shift] = currentItem
      }
      return data
    })
    setRerender(!rerender)
  }

  return <div className="List">
    {[...tools.getData(pageKey).list.map((itemData, i) => {
      if (itemData.type === 'task')
        return <Task
         isMain={isMain}
         rewriteListItem={rewriteListItem}
         removeListItem={removeListItem}
         completeTask={completeTask}
         itemIndex={i}
         itemData={itemData}
         key={'-task-'+i}/>
      else if (itemData.type === 'note')
        return <Note
          isMain={isMain}
          shiftNote={shiftNote}
          rewriteListItem={rewriteListItem}
          removeListItem={removeListItem}
          itemIndex={i}
          itemData={itemData}
          key={'-note-'+i}/>
        else
          return <></>
    })]}
  </div>
}

export default List;
