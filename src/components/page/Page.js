import React, {useState} from 'react';
import PageHeader from './header/PageHeader';
import PageFooter from './footer/PageFooter';
import List from './list/List';

const Page = ({pageKey, pageIndex, children}) => {
  const [rerender, setRerender] = useState(false)
  const isMain = pageIndex === 0
  const dayDate = new Date(new Date().setDate(new Date().getDate() + pageIndex))

  return <><div className="Page">
    <PageHeader dayDate={dayDate} />
    <div className="lists-container">
      <List isMain={isMain} pageKey={pageKey}/>
    </div>
    <PageFooter
    pageKey={pageKey}
    refresh={() => setRerender(!rerender)}
    isMain={isMain} />
  </div>
  {children}
  </>
}

export default Page;
