import React, {useState} from 'react';
import Tasks from './Tasks';
import Graph from './Graph';
import SceneChanger from './SceneChanger';

const Scene = () => {
  const [scene, setScene] = useState(true)

  return <div className="Scene">
    {(() =>
      scene ?
      <Tasks amount={7}/>
      :
      <Graph />
    )()}
    <SceneChanger callBack={() => setScene(!scene)} status={scene}/>
  </div>
}

export default Scene;
