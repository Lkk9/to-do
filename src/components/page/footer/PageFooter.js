import React from 'react';
import DaysStatusIndicator from './DaysStatusIndicator';
import AddItemsButton from './AddItemsButton';

const PageFooter = ({isMain, refresh, pageKey}) => (
  <div className="PageBanner PageFooter">
    {(()=>{
      if (isMain) return <DaysStatusIndicator />
      else return <AddItemsButton refresh={refresh} pageKey={pageKey}/>
    })()}
  </div>
);

export default PageFooter;
