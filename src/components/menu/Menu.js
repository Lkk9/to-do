import React from 'react';
import './menuStyles.css'
import MenuButton from './MenuButton';

const Menu = ({show, setScene, selected}) => {
  const buttons = ['tasks', 'activity']
  return <>
  <div className={`Menu-background${show ? ' Menu-background-active' : ''}`}></div>
  <div className={`Menu${show ? ' Menu-active' : ''}`}>
    {[...buttons.map((b ,i) => <MenuButton
      text={b}
      isSelected={selected === i}
      setScene={() => setScene(i)}/>
    )]}
  </div>
  </>
}

export default Menu;
