import React from 'react';

const PageBanner = ({children, className}) => (
  <div className={`${className ? className+' ' : ''}PageBanner`}>
    {children}
  </div>
);

export default PageBanner;
