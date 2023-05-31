import React, { Suspense, useRef } from 'react';
import { Model } from 'react-babylonjs';
import { Vector3, Color4 } from '@babylonjs/core';
import { useScene } from 'react-babylonjs';

const M = ({ color }) => {
  const scene = useScene();

  scene.clearColor = new Color4(0, 0, 0, 0);

  const ref = useRef();

  return (
    <Suspense>
      <Model
        ref={ref}
        sceneFilename='shirtModel.glb'
        rootUrl={`/Meshes/Majca/1/`}
        position={new Vector3(0, -20, 0)}
        scaling={new Vector3(1, 1, 1)}
      />
    </Suspense>
  );
};

export default M;
