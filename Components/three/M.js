import React, { useEffect, useRef } from 'react';
import { useLoader, useFrame, useThree } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { easing } from 'maath';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { useRouter } from 'next/router';
import { Decal, useTexture } from '@react-three/drei';

const M = ({ path, scale, rotation, color }) => {
  // const gltf = useLoader(GLTFLoader, './indexMesh/M.glb');
  const gltf = useLoader(GLTFLoader, path);

  const router = useRouter();

  useEffect(() => {
    if (color) {
      gltf.scene.children.forEach((e) => {
        e.material.color.setColor = new THREE.Color(color);
      });
    } else {
      gltf.scene.children.forEach((e) => {
        e.material.color = new THREE.Color('#FFFFFF');
      });
    }

    if (router.pathname === '/') {
      gltf.scene.children.forEach((e) => {
        e.material.color = new THREE.Color('orange');
      });
    }
  }, [color]);

  return (
    <CameraRig>
      <primitive
        // scale={[0.7, 0.7, 0.7]}
        scale={scale}
        // rotation={[0.1, 0, 0]}
        rotation={rotation}
        object={gltf.scene}
      />
    </CameraRig>
  );
};

function CameraRig({ children }) {
  const group = useRef();
  // const snap = useSnapshot(state);
  useFrame((state, delta) => {
    easing.dampE(
      group.current.rotation,
      [state.pointer.y / 10, -state.pointer.x / 5, 0],
      0.25,
      delta
    );
  });
  return <group ref={group}>{children}</group>;
}

export default M;
