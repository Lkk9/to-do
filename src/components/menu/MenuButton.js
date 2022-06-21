import React from 'react';

const MenuButton = ({text, setScene, isSelected}) => (
  <div className={`MenuButton${isSelected ? ' MenuButton-selected' : ''}`} onClick={() => setScene()}>
    {text}
  </div>
);

export default MenuButton;
