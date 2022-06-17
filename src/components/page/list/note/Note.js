import React, {useEffect, useId} from 'react';
import './noteStyles.css';

const Note = ({isMain, itemIndex, itemData, rewriteListItem, removeListItem, shiftNote}) => {
  const noteId = useId()
  useEffect(() => {
    document.getElementById(noteId).value = itemData.value
    document.getElementById(noteId).parentElement.style.setProperty('--rotate-angle', itemData.rotation)
  }, [noteId, itemData])

  return <div className="Note">
    <div className="Note-container">
      <div className="Note-navigate">
      <label className="Note-icon">
        <button style={{display: 'none'}} onClick={() => {
          shiftNote(itemIndex, -1)
        }}>
        </button>
        <svg
        className="icon note-lift-icon"
        width="24px"
        height="24px"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg">
        <path d="M11.178 19.569a.998.998 0 0 0 1.644 0l9-13A.999.999 0 0 0 21 5H3a1.002 1.002 0 0 0-.822 1.569l9 13z"/>
        </svg>
      </label>
      <label className="Note-icon">
        <button style={{display: 'none'}} onClick={() => {
          shiftNote(itemIndex, 1)
        }}>
        </button>
        <svg
        className="icon note-drop-icon"
        width="24px"
        height="24px"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg">
        <path d="M11.178 19.569a.998.998 0 0 0 1.644 0l9-13A.999.999 0 0 0 21 5H3a1.002 1.002 0 0 0-.822 1.569l9 13z"/>
        </svg>
      </label>
      </div>
      {!isMain ?
        <label className="Note-icon">
          <button style={{display: 'none'}} onClick={() => {
            removeListItem(itemIndex)
          }}>
          </button>
          <svg style={{enableBackground:"new 0 0 95.939 95.939"}}
          className="icon note-remove-icon"
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
      : <div></div>}
    </div>
    <textarea
    id={noteId}
    placeholder="blank note"
    maxLength="180"
    className="Note-input"
    spellCheck="false"
    onChange={(e) => {
      rewriteListItem(itemIndex, e.target.value)
    }}
    ></textarea>
  </div>

}

export default Note;
