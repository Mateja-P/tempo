import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import SceneComponent from '@/Components/editor/SceneComponent';
import Controller from '../Controller';
import { useRouter } from 'next/router';
import axios from 'axios';
import MobilePanel from './MobilePanel';
import { Scene, Engine } from 'react-babylonjs';
import { Vector3 } from '@babylonjs/core';
import M from '@/Components/editor/M';

const Canvas = dynamic(() => import('@/Components/editor/SceneComponent'), {
  ssr: false,
});

const MobileView = () => {
  const [data, setData] = useState([]);
  const router = useRouter();

  const id = router.query.pid;

  useEffect(() => {
    axios
      .get(`http://localhost:8800/editor?pid=${id}`)
      .then((res) => setData(res.data));
  }, [router.query]);

  const controller = new Controller(
    data[0] && data[0].model,
    data[0] && data[0].defaultName,
    data[0] && data[0].id
  );

  const faces = data[0] && JSON.parse(data[0].faces);

  const onSceneReady = (scene) => {
    controller.attachScene(scene);
  };

  return (
    <div>Trenutna verzija softvera se koristi samo na desktopu</div>
    // <div className='bg-black text-white h-screen flex flex-col justify-between'>
    //   <div className='px-3'>
    //     <div className='flex justify-end py-3'>Finished</div>
    //     <div className='text-sm text-center'>
    //       Selected face: <span>Front</span>
    //     </div>
    //   </div>
    //   <Engine>
    //     <Scene>
    //       <arcRotateCamera
    //         name='camera1'
    //         alpha={Math.PI / -2}
    //         beta={Math.PI / 2}
    //         radius={0.05}
    //         // target={ref.current && ref.current}
    //       />
    //       <hemisphericLight
    //         name='light1'
    //         intensity={0.7}
    //         direction={Vector3.Up()}
    //       />
    //       <M />
    //     </Scene>
    //   </Engine>
    //   {/* <Canvas onSceneReady={onSceneReady} style={{ flex: 1 }} /> */}
    //   <div>
    //     <MobilePanel
    //       faces={faces !== undefined && faces.properties}
    //       id={data[0] && data[0].id}
    //     />
    //   </div>
    // </div>
  );
};

export default MobileView;
