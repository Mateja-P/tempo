import { Vector3 } from '@babylonjs/core';
import { HemisphericLight } from '@babylonjs/core';
import '@babylonjs/loaders';
import * as BABYLON from '@babylonjs/core';

export default class LoadMeshes {
  cosntructor(items) {
    this.items = items;
  }

  attachScene = (scene) => {
    this._scene = scene;
    this.loadScene(scene);
  };

  loadScene = (scene) => {
    console.log(this.items);
    var camera = new BABYLON.ArcRotateCamera(
      'camera1',
      Math.PI / 2,
      Math.PI / 2,
      100,
      new BABYLON.Vector3(0, 0, 0),
      scene
    );

    camera.setTarget(Vector3.Zero());

    const canvas = scene.getEngine().getRenderingCanvas();

    camera.attachControl(canvas, true);

    const light = new HemisphericLight('light', new Vector3(0, 1, 0), scene);

    light.intensity = 0.7;

    // const marker = new BABYLON.TransformNode('marker');
    // // marker.scaling = new BABYLON.Vector3(0.001, 0.001, 0.001);
    // marker.position.y = -25;

    let modelParent;

    //   this.items.forEach((e) => {
    //     BABYLON.SceneLoader.ImportMesh('', `data:`, e.mesh, scene, (meshes) => {
    //       modelParent = meshes[0];
    //       modelParent.parent = marker;
    //     });
    //   });
  };
}
