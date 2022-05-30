import React from 'react';

const PageBanner = ({children, className}) => (
  <div className={`PageBanner${className ? ' ' + className : ''}`}>
    {children}
  </div>
);

export default PageBanner;
