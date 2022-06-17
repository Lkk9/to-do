import React from 'react';
import {useState} from 'react';
import PageBanner from './PageBanner';
import DaysStatusIndicator from './DaysStatusIndicator';
import AddItemsButton from './AddItemsButton';
import List from './List';

const Page = ({pageKey, pageIndex, children}) => {
  const [rerender, setRerender] = useState(false)
  const isMain = pageIndex === 0
  const weekday = new Date(new Date().setDate(new Date().getDate() + pageIndex)).toLocaleDateString('en-US', {weekday: 'long'})

  return <><div className="Page">
    <PageBanner className="PageHeader">
    {weekday}
    </PageBanner>
    <div className="lists-container">
    <List isMain={isMain} pageKey={pageKey}/>
    </div>
    <PageBanner className="PageFooter">
      <DaysStatusIndicator style={{display: !isMain ? 'none' : 'flex'}} />
      {(()=>{
        if (isMain) return <></>
        else return <AddItemsButton refresh={() => setRerender(!rerender)} pageKey={pageKey}/>
      })()}

    </PageBanner>
  </div>
  {children}
  </>
}

export default Page;
