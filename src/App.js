import React from 'react';
import Tasks from './components/Tasks';


const App = () => {
  const amount = 7

  return <div className="App">
    <Tasks amount={amount}/>
  </div>
}

export default App;
