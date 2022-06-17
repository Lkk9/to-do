import React, {useState} from 'react';
import Tasks from './page/Tasks';
import GraphInfo from './graph/GraphInfo';
import SceneChanger from './SceneChanger';

const Scene = () => {
  const [scene, setScene] = useState(true)

  return <div className="Scene">
    {(() =>
      scene ?
      <Tasks amount={7}/>
      :
      <GraphInfo />
    )()}
    <SceneChanger callBack={() => setScene(!scene)} status={scene}/>
  </div>
}

export default Scene;
