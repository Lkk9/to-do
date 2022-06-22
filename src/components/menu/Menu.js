import React from 'react';
import './menuStyles.css'
import MenuButton from './MenuButton';

const Menu = ({show, setScene, selected}) => {
  const buttons = ['tasks', 'activity', 'about']
  return <>
  <div
  className={`Menu-background${show ? ' Menu-background-active' : ''}`}
  onClick={() => {
    setScene(selected)
  }}
  ></div>
  <div className={`Menu${show ? ' Menu-active' : ''}`}>
    {[...buttons.map((b ,i) => <MenuButton
      text={b}
      isSelected={selected === i}
      setScene={() => setScene(i)}
      key={'MenuItem-'+i}/>
    )]}
  </div>
  </>
}

export default Menu;
