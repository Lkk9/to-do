import React, {useState} from 'react';

const PageHeader = ({dayDate}) => {
  const [isHover, setIsHover] = useState(false);

  return <div
  className="PageBanner PageHeader"
  onMouseEnter={() => setIsHover(true)}
  onMouseLeave={() => setIsHover(false)}>
    <div className="PageHeaderText" style={{opacity: +!isHover}}>
      {dayDate.toLocaleDateString('en-US', {weekday: 'long'})}
    </div>
    <div className="PageHeaderText" style={{opacity: +isHover}}>
      {dayDate.toLocaleDateString('en-US')}
    </div>
  </div>
}

export default PageHeader;
