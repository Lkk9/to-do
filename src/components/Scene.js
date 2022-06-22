import React, {useState} from 'react';
import Tasks from './page/Tasks';
import GraphInfo from './graph/GraphInfo';
import SceneChanger from './SceneChanger';
import About from './about/About';
import Menu from './menu/Menu';

const Scene = () => {
  const [menuExpand, setMenuExpand] = useState(false)
  const [scene, setScene] = useState(0)

  return <div className="Scene">
    {(() => {
      switch (scene) {
        case 0:
          return <Tasks amount={7}/>
        case 1:
          return <GraphInfo />
        case 2:
         return <About />
        default:
          return <Tasks amount={7}/>
      }
    })()}
    <Menu show={menuExpand} selected={scene} setScene={(status) => {
      setScene(status)
      setMenuExpand(!menuExpand)
    }}/>
    <SceneChanger callBack={() => setMenuExpand(!menuExpand)} iconStatus={menuExpand}/>
  </div>
}

export default Scene;
