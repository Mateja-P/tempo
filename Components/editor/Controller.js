import * as BABYLON from '@babylonjs/core';
import { Vector3, HemisphericLight, PointerEventTypes } from '@babylonjs/core';
import '@babylonjs/loaders';
import 'babylonjs-serializers';
import * as GUI from '@babylonjs/gui';
import { ToastContainer, toast } from 'react-toastify';

export default class Controller {
  constructor(
    model,
    name,
    id,
    getValue,
    lastDecal,
    deleteDecal,
    meshColor,
    setItemsInfo,
    router,
    productInfoObject,
    refs,
    insertCartId
  ) {
    this._scene = null;
    this._store = {};
    this.model = model;
    this.name = name;
    this.id = id;
    this.getValue = getValue;
    this.lastDecal = lastDecal;
    this.deleteDecal = deleteDecal;
    this.meshColor = meshColor;
    this.clicked = {};
    this.setItemsInfo = setItemsInfo;
    this.router = router;
    this.productInfoObject = productInfoObject;
    this.refs = refs;
    this.insertCartId = insertCartId;
  }

  attachScene(scene) {
    this._scene = scene;
    this._store['enabledMesh'] = 'front';
    this._store['activeImage'] = 'HomePage/logo.png';
    this._store['activeDecal'] = 0;
    this._store['canvasColor'] = true;
    this._store['imagesOfFaces'] = [];
    this._pointerObserver = this.attachPointerObserver(scene);
    this._hoverObserver = this.attachHoverObserver(scene);
    this.loadScene(scene);
    this.exportModel(scene);
    this.scaleDecal(scene);
    this.moveXDecal(scene);
    this.moveYDecal(scene);
    this.rotateDecal(scene);
    this.removeDecalM(scene);
    this.setCanvasColor(scene);
  }

  scaleDecal = (scene) => {
    this.refs.iScaleRef.current.addEventListener('click', () => {
      if (this._store['activeDecal'] === 0) return;

      const mesh = scene.getMeshById(this._store['activeDecal']);
      const obj = scene.getMeshById(this._store['enabledMesh']);

      var prevSize = mesh.decalSize.x + 0.5;

      const d = new Date();
      const ms = d.getTime();

      var decalMaterial = new BABYLON.StandardMaterial(ms, scene);
      decalMaterial.diffuseTexture = new BABYLON.Texture(mesh.decalImg, scene);
      decalMaterial.diffuseTexture.hasAlpha = true;
      decalMaterial.zOffset = -2;
      decalMaterial.backFaceCulling = false;
      this._store['decalMaterial'] = decalMaterial;

      const decalSize = new BABYLON.Vector3(prevSize, prevSize, prevSize);
      const decalModel = BABYLON.MeshBuilder.CreateDecal(ms, obj, {
        position: new BABYLON.Vector3(
          mesh.decalPositions.position._x,
          mesh.decalPositions.position._y,
          mesh.decalPositions.position._z
        ),
        normal: mesh.decalPositions.normal,
        size: decalSize,
        angle: mesh.decalAngle,
      });
      decalModel.material = this._store['decalMaterial'];

      decalModel.decalFace = this._store['enabledMesh'];
      decalModel.decalSize = decalSize;
      decalModel.decalImg = mesh.decalImg;
      decalModel.decalAngle = mesh.decalAngle;
      decalModel.decalPositions = {
        position: mesh.decalPositions.position,
        normal: mesh.decalPositions.normal,
      };

      if (this.clicked.type == 'removeDecal') {
        this.removeDecal(scene, decalModel.id);
      } else {
        this.getValue(decalModel);
        this.setActiveDecal(decalModel.id);
        this.lastDecal(decalModel.id);
      }

      this.removeDecal(scene, mesh.id);
    });

    this.refs.dScaleRef.current.addEventListener('click', () => {
      if (this._store['activeDecal'] === 0) return;

      const mesh = scene.getMeshById(this._store['activeDecal']);
      const obj = scene.getMeshById(this._store['enabledMesh']);

      var prevSize = mesh.decalSize.x - 0.5;

      const d = new Date();
      const ms = d.getTime();

      var decalMaterial = new BABYLON.StandardMaterial(ms, scene);
      decalMaterial.diffuseTexture = new BABYLON.Texture(mesh.decalImg, scene);
      decalMaterial.diffuseTexture.hasAlpha = true;
      decalMaterial.zOffset = -2;
      decalMaterial.backFaceCulling = false;
      this._store['decalMaterial'] = decalMaterial;

      const decalSize = new BABYLON.Vector3(prevSize, prevSize, prevSize);
      const decalModel = BABYLON.MeshBuilder.CreateDecal(ms, obj, {
        position: new BABYLON.Vector3(
          mesh.decalPositions.position._x,
          mesh.decalPositions.position._y,
          mesh.decalPositions.position._z
        ),
        normal: mesh.decalPositions.normal,
        size: decalSize,
        angle: mesh.decalAngle,
      });
      decalModel.material = this._store['decalMaterial'];

      decalModel.decalFace = this._store['enabledMesh'];
      decalModel.decalSize = decalSize;
      decalModel.decalImg = mesh.decalImg;
      decalModel.decalAngle = mesh.decalAngle;
      decalModel.decalPositions = {
        position: mesh.decalPositions.position,
        normal: mesh.decalPositions.normal,
      };

      if (this.clicked.type == 'removeDecal') {
        this.removeDecal(scene, decalModel.id);
      } else {
        this.getValue(decalModel);
        this.setActiveDecal(decalModel.id);
        this.lastDecal(decalModel.id);
      }

      this.removeDecal(scene, mesh.id);
    });
  };

  moveXDecal = (scene) => {
    this.refs.iMoveXRef.current.addEventListener('click', () => {
      if (this._store['activeDecal'] === 0) return;

      const mesh = scene.getMeshById(this._store['activeDecal']);
      const obj = scene.getMeshById(this._store['enabledMesh']);

      var prevSize = mesh.decalSize.x;
      var prevPos = (mesh.decalPositions.position._x += 0.5);

      const d = new Date();
      const ms = d.getTime();

      var decalMaterial = new BABYLON.StandardMaterial(ms, scene);
      decalMaterial.diffuseTexture = new BABYLON.Texture(mesh.decalImg, scene);
      decalMaterial.diffuseTexture.hasAlpha = true;
      decalMaterial.zOffset = -2;
      decalMaterial.backFaceCulling = false;
      this._store['decalMaterial'] = decalMaterial;

      const decalSize = new BABYLON.Vector3(prevSize, prevSize, prevSize);
      const decalModel = BABYLON.MeshBuilder.CreateDecal(ms, obj, {
        position: new BABYLON.Vector3(
          prevPos,
          mesh.decalPositions.position._y,
          mesh.decalPositions.position._z
        ),
        normal: mesh.decalPositions.normal,
        size: decalSize,
        angle: mesh.decalAngle,
      });
      decalModel.material = this._store['decalMaterial'];

      decalModel.decalFace = this._store['enabledMesh'];
      decalModel.decalSize = decalSize;
      decalModel.decalImg = mesh.decalImg;
      decalModel.decalAngle = mesh.decalAngle;
      decalModel.decalPositions = {
        position: mesh.decalPositions.position,
        normal: mesh.decalPositions.normal,
      };

      if (this.clicked.type == 'removeDecal') {
        this.removeDecal(scene, decalModel.id);
      } else {
        this.getValue(decalModel);
        this.setActiveDecal(decalModel.id);
        this.lastDecal(decalModel.id);
      }

      this.removeDecal(scene, mesh.id);
    });

    this.refs.dMoveXRef.current.addEventListener('click', () => {
      if (this._store['activeDecal'] === 0) return;

      const mesh = scene.getMeshById(this._store['activeDecal']);
      const obj = scene.getMeshById(this._store['enabledMesh']);

      var prevSize = mesh.decalSize.x;
      var prevPos = (mesh.decalPositions.position._x -= 0.5);

      const d = new Date();
      const ms = d.getTime();

      var decalMaterial = new BABYLON.StandardMaterial(ms, scene);
      decalMaterial.diffuseTexture = new BABYLON.Texture(mesh.decalImg, scene);
      decalMaterial.diffuseTexture.hasAlpha = true;
      decalMaterial.zOffset = -2;
      decalMaterial.backFaceCulling = false;
      this._store['decalMaterial'] = decalMaterial;

      const decalSize = new BABYLON.Vector3(prevSize, prevSize, prevSize);
      const decalModel = BABYLON.MeshBuilder.CreateDecal(ms, obj, {
        position: new BABYLON.Vector3(
          prevPos,
          mesh.decalPositions.position._y,
          mesh.decalPositions.position._z
        ),
        normal: mesh.decalPositions.normal,
        size: decalSize,
        angle: mesh.decalAngle,
      });
      decalModel.material = this._store['decalMaterial'];

      decalModel.decalFace = this._store['enabledMesh'];
      decalModel.decalSize = decalSize;
      decalModel.decalImg = mesh.decalImg;
      decalModel.decalAngle = mesh.decalAngle;
      decalModel.decalPositions = {
        position: mesh.decalPositions.position,
        normal: mesh.decalPositions.normal,
      };

      if (this.clicked.type == 'removeDecal') {
        this.removeDecal(scene, decalModel.id);
      } else {
        this.getValue(decalModel);
        this.setActiveDecal(decalModel.id);
        this.lastDecal(decalModel.id);
      }

      this.removeDecal(scene, mesh.id);
    });
  };

  moveYDecal = (scene) => {
    this.refs.iMoveYRef.current.addEventListener('click', () => {
      if (this._store['activeDecal'] === 0) return;

      const mesh = scene.getMeshById(this._store['activeDecal']);
      const obj = scene.getMeshById(this._store['enabledMesh']);

      var prevSize = mesh.decalSize.x;
      var prevPos = (mesh.decalPositions.position._y += 0.5);

      const d = new Date();
      const ms = d.getTime();

      var decalMaterial = new BABYLON.StandardMaterial(ms, scene);
      decalMaterial.diffuseTexture = new BABYLON.Texture(mesh.decalImg, scene);
      decalMaterial.diffuseTexture.hasAlpha = true;
      decalMaterial.zOffset = -2;
      decalMaterial.backFaceCulling = false;
      this._store['decalMaterial'] = decalMaterial;

      const decalSize = new BABYLON.Vector3(prevSize, prevSize, prevSize);
      const decalModel = BABYLON.MeshBuilder.CreateDecal(ms, obj, {
        position: new BABYLON.Vector3(
          mesh.decalPositions.position._x,
          prevPos,
          mesh.decalPositions.position._z
        ),
        normal: mesh.decalPositions.normal,
        size: decalSize,
        angle: mesh.decalAngle,
      });
      decalModel.material = this._store['decalMaterial'];

      decalModel.decalFace = this._store['enabledMesh'];
      decalModel.decalSize = decalSize;
      decalModel.decalImg = mesh.decalImg;
      decalModel.decalAngle = mesh.decalAngle;
      decalModel.decalPositions = {
        position: mesh.decalPositions.position,
        normal: mesh.decalPositions.normal,
      };

      if (this.clicked.type == 'removeDecal') {
        this.removeDecal(scene, decalModel.id);
      } else {
        this.getValue(decalModel);
        this.setActiveDecal(decalModel.id);
        this.lastDecal(decalModel.id);
      }

      this.removeDecal(scene, mesh.id);
    });

    this.refs.dMoveYRef.current.addEventListener('click', () => {
      if (this._store['activeDecal'] === 0) return;

      const mesh = scene.getMeshById(this._store['activeDecal']);
      const obj = scene.getMeshById(this._store['enabledMesh']);

      var prevSize = mesh.decalSize.x;
      var prevPos = (mesh.decalPositions.position._y -= 0.5);

      const d = new Date();
      const ms = d.getTime();

      var decalMaterial = new BABYLON.StandardMaterial(ms, scene);
      decalMaterial.diffuseTexture = new BABYLON.Texture(mesh.decalImg, scene);
      decalMaterial.diffuseTexture.hasAlpha = true;
      decalMaterial.zOffset = -2;
      decalMaterial.backFaceCulling = false;
      this._store['decalMaterial'] = decalMaterial;

      const decalSize = new BABYLON.Vector3(prevSize, prevSize, prevSize);
      const decalModel = BABYLON.MeshBuilder.CreateDecal(ms, obj, {
        position: new BABYLON.Vector3(
          mesh.decalPositions.position._x,
          prevPos,
          mesh.decalPositions.position._z
        ),
        normal: mesh.decalPositions.normal,
        size: decalSize,
        angle: mesh.decalAngle,
      });
      decalModel.material = this._store['decalMaterial'];

      decalModel.decalFace = this._store['enabledMesh'];
      decalModel.decalSize = decalSize;
      decalModel.decalImg = mesh.decalImg;
      decalModel.decalAngle = mesh.decalAngle;
      decalModel.decalPositions = {
        position: mesh.decalPositions.position,
        normal: mesh.decalPositions.normal,
      };

      if (this.clicked.type == 'removeDecal') {
        this.removeDecal(scene, decalModel.id);
      } else {
        this.getValue(decalModel);
        this.setActiveDecal(decalModel.id);
        this.lastDecal(decalModel.id);
      }

      this.removeDecal(scene, mesh.id);
    });
  };

  rotateDecal = (scene) => {
    this.refs.iRotateRef.current.addEventListener('click', () => {
      if (this._store['activeDecal'] === 0) return;

      const mesh = scene.getMeshById(this._store['activeDecal']);
      const obj = scene.getMeshById(this._store['enabledMesh']);

      var prevSize = mesh.decalSize.x;

      var angle = (mesh.decalAngle += 0.5);

      const d = new Date();
      const ms = d.getTime();

      var decalMaterial = new BABYLON.StandardMaterial(ms, scene);
      decalMaterial.diffuseTexture = new BABYLON.Texture(mesh.decalImg, scene);
      decalMaterial.diffuseTexture.hasAlpha = true;
      decalMaterial.zOffset = -2;
      decalMaterial.backFaceCulling = false;
      this._store['decalMaterial'] = decalMaterial;

      const decalSize = new BABYLON.Vector3(prevSize, prevSize, prevSize);
      const decalModel = BABYLON.MeshBuilder.CreateDecal(ms, obj, {
        position: new BABYLON.Vector3(
          mesh.decalPositions.position._x,
          mesh.decalPositions.position._y,
          mesh.decalPositions.position._z
        ),
        normal: mesh.decalPositions.normal,
        size: decalSize,
        angle: angle,
      });
      decalModel.material = this._store['decalMaterial'];

      decalModel.decalFace = this._store['enabledMesh'];
      decalModel.decalSize = decalSize;
      decalModel.decalImg = mesh.decalImg;
      decalModel.decalAngle = mesh.decalAngle;
      decalModel.decalPositions = {
        position: mesh.decalPositions.position,
        normal: mesh.decalPositions.normal,
      };

      if (this.clicked.type == 'removeDecal') {
        this.removeDecal(scene, decalModel.id);
      } else {
        this.getValue(decalModel);
        this.setActiveDecal(decalModel.id);
        this.lastDecal(decalModel.id);
      }

      this.removeDecal(scene, mesh.id);
    });

    this.refs.dRotateRef.current.addEventListener('click', () => {
      if (this._store['activeDecal'] === 0) return;

      const mesh = scene.getMeshById(this._store['activeDecal']);
      const obj = scene.getMeshById(this._store['enabledMesh']);

      var prevSize = mesh.decalSize.x;

      var angle = (mesh.decalAngle -= 0.5);

      const d = new Date();
      const ms = d.getTime();

      var decalMaterial = new BABYLON.StandardMaterial(ms, scene);
      decalMaterial.diffuseTexture = new BABYLON.Texture(mesh.decalImg, scene);
      decalMaterial.diffuseTexture.hasAlpha = true;
      decalMaterial.zOffset = -2;
      decalMaterial.backFaceCulling = false;
      this._store['decalMaterial'] = decalMaterial;

      const decalSize = new BABYLON.Vector3(prevSize, prevSize, prevSize);
      const decalModel = BABYLON.MeshBuilder.CreateDecal(ms, obj, {
        position: new BABYLON.Vector3(
          mesh.decalPositions.position._x,
          mesh.decalPositions.position._y,
          mesh.decalPositions.position._z
        ),
        normal: mesh.decalPositions.normal,
        size: decalSize,
        angle: angle,
      });
      decalModel.material = this._store['decalMaterial'];

      decalModel.decalFace = this._store['enabledMesh'];
      decalModel.decalSize = decalSize;
      decalModel.decalImg = mesh.decalImg;
      decalModel.decalAngle = mesh.decalAngle;
      decalModel.decalPositions = {
        position: mesh.decalPositions.position,
        normal: mesh.decalPositions.normal,
      };

      if (this.clicked.type == 'removeDecal') {
        this.removeDecal(scene, decalModel.id);
      } else {
        this.getValue(decalModel);
        this.setActiveDecal(decalModel.id);
        this.lastDecal(decalModel.id);
      }

      this.removeDecal(scene, mesh.id);
    });
  };

  removeDecalM = (scene) => {
    this.refs.removeRef.current.addEventListener('click', () => {
      const mesh = scene.getMeshById(this._store['activeDecal']);
      if (mesh) {
        mesh.dispose();
        this.deleteDecal(mesh.id);
      }
    });
  };

  exportModel = (scene) => {
    var advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI');

    var button1 = GUI.Button.CreateSimpleButton('but1', 'Završi');
    button1.width = '150px';
    button1.height = '40px';
    button1.color = 'grey';
    button1.top = '10px';
    button1.cornerRadius = 20;
    button1.onPointerUpObservable.add(() => {
      const engine = scene.getEngine();

      const cameraFront = scene.cameras[1];
      const cameraRight = scene.cameras[2];
      const cameraLeft = scene.cameras[3];
      const cameraBack = scene.cameras[4];

      BABYLON.Tools.CreateScreenshotUsingRenderTarget(
        engine,
        cameraFront,
        { width: 1080, height: 1080 },
        (data) => {
          var mat1 = new BABYLON.StandardMaterial('mat', scene);
          mat1.diffuseTexture = new BABYLON.Texture(data, scene);
          window.localStorage.setItem('productImage', data);
          this._store['imagesOfFaces'] = [
            ...this._store['imagesOfFaces'],
            data,
          ];
        }
      );
      BABYLON.Tools.CreateScreenshotUsingRenderTarget(
        engine,
        cameraRight,
        { width: 1080, height: 1080 },
        (data) => {
          var mat2 = new BABYLON.StandardMaterial('mat', scene);
          mat2.diffuseTexture = new BABYLON.Texture(data, scene);
          window.localStorage.setItem('productImage', data);
          this._store['imagesOfFaces'] = [
            ...this._store['imagesOfFaces'],
            data,
          ];
        }
      );
      BABYLON.Tools.CreateScreenshotUsingRenderTarget(
        engine,
        cameraLeft,
        { width: 1080, height: 1080 },
        (data) => {
          var mat3 = new BABYLON.StandardMaterial('mat', scene);
          mat3.diffuseTexture = new BABYLON.Texture(data, scene);
          window.localStorage.setItem('productImage', data);
          this._store['imagesOfFaces'] = [
            ...this._store['imagesOfFaces'],
            data,
          ];
        }
      );
      BABYLON.Tools.CreateScreenshotUsingRenderTarget(
        engine,
        cameraBack,
        { width: 1080, height: 1080 },
        (data) => {
          var mat4 = new BABYLON.StandardMaterial('mat', scene);
          mat4.diffuseTexture = new BABYLON.Texture(data, scene);
          window.localStorage.setItem('productImage', data);
          this._store['imagesOfFaces'] = [
            ...this._store['imagesOfFaces'],
            data,
          ];
        }
      );

      const allImages = window.localStorage.getItem('allImages');
      const imgs = JSON.parse(allImages);

      if (this._store['imagesOfFaces'].length > 0) {
        this.setItemsInfo({
          // id: this.productInfoObject.id,
          id: this.insertCartId,
          promoId: this.productInfoObject.promoId,
          colorId: this.meshColor ? this.meshColor.promoId : undefined,
          productsImages: this.productInfoObject.productsImages,
          model: this.productInfoObject.model,
          cena: this.productInfoObject.cena,
          cenaStampe: this.productInfoObject.cenaStampe,
          minimalnaK: 1,
          quantity: 1,
          boja: this.meshColor ? this.meshColor.color : undefined,
          veicina: this.productInfoObject.veicina,
          rod: this.productInfoObject.rod,
          slike: imgs,
          meshImgs: this._store['imagesOfFaces'],
          total: this.productInfoObject.total,
        });

        this.router.push('/cart');
      } else {
        toast('Klikni još jednom za potvrdu');
      }
    });
    advancedTexture.addControl(button1);
    button1.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    button1.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
  };

  _loadScene = (scene) => {
    const canvas = scene.getEngine().getRenderingCanvas();

    scene.clearColor = new BABYLON.Color4(0, 0, 0, 0);

    var camera1 = new BABYLON.ArcRotateCamera(
      'camera1',
      Math.PI / 2,
      Math.PI / 2,
      100,
      new BABYLON.Vector3(0, 0, 0),
      scene
    );
    camera1.setTarget(Vector3.Zero());
    camera1.attachControl(canvas, true);
    scene.activeCamera = camera1;

    var camera2Front = new BABYLON.ArcRotateCamera(
      'camera2',
      Math.PI / 2,
      Math.PI / 2,
      100,
      new BABYLON.Vector3(0, 0, 0),
      scene
    );
    camera2Front.setTarget(Vector3.Zero());
    camera2Front.attachControl(canvas, true);

    var camera3Right = new BABYLON.ArcRotateCamera(
      'camera3',
      Math.PI / -1,
      Math.PI / 2,
      100,
      new BABYLON.Vector3(0, 0, 0),
      scene
    );
    camera3Right.setTarget(Vector3.Zero());
    camera3Right.attachControl(canvas, true);

    var camera4Left = new BABYLON.ArcRotateCamera(
      'camera4',
      Math.PI / -20,
      Math.PI / 2,
      100,
      new BABYLON.Vector3(0, 0, 0),
      scene
    );
    camera4Left.setTarget(Vector3.Zero());
    camera4Left.attachControl(canvas, true);

    var camera5Back = new BABYLON.ArcRotateCamera(
      'camera5',
      Math.PI / -2,
      Math.PI / 2,
      100,
      new BABYLON.Vector3(0, 0, 0),
      scene
    );
    camera5Back.setTarget(Vector3.Zero());
    camera5Back.attachControl(canvas, true);

    const light = new HemisphericLight('light', new Vector3(0, 1, 0), scene);

    light.intensity = 0.7;

    const marker = new BABYLON.TransformNode('marker');
    // marker.scaling = new BABYLON.Vector3(0.001, 0.001, 0.001);
    marker.position.y = -25;

    var mat = new BABYLON.StandardMaterial('mat', scene);
    if (this.meshColor) {
      if (this.meshColor.code) {
        mat.diffuseColor = new BABYLON.Color3(
          this.meshColor.code.x,
          this.meshColor.code.y,
          this.meshColor.code.z
        );
      }
    }
    mat.backFaceCulling = false;

    let modelParent;

    if (this.id !== undefined && this.model !== undefined) {
      BABYLON.SceneLoader.ImportMesh(
        '',
        `/Meshes/${this.id}/`,
        this.model,
        scene,
        (meshes) => {
          modelParent = meshes[0];
          this.meshColor &&
            meshes.forEach((e) => {
              e.material = mat;
            });
          modelParent.parent = marker;
        }
      );
    }
  };
  get loadScene() {
    return this._loadScene;
  }
  set loadScene(value) {
    this._loadScene = value;
  }

  attachHoverObserver = (scene) => {
    if (!scene) return;
    let decal;
    const delay = 2;
    let count = 0;
    scene.onPointerMove = (evt) => {
      // if (this._store['activeImage'].length == 0) return;
      const selectedMesh = scene.getMeshById(this._store['enabledMesh']);
      if (count === 0) {
        const decalMaterial = new BABYLON.StandardMaterial('decalMat', scene);
        decalMaterial.diffuseTexture = new BABYLON.Texture(
          // 'scene/1.jpg',
          this._store['activeImage'],
          scene
        );
        decalMaterial.diffuseTexture.hasAlpha = true;
        decalMaterial.zOffset = -2;

        var pickResult = scene.pick(
          scene.pointerX,
          scene.pointerY,
          (mesh) => mesh === selectedMesh
        );
        if (pickResult.hit) {
          if (decal) {
            decal.dispose();
            decal = null;
          }
          const normal = scene.activeCamera
            .getForwardRay()
            .direction.negateInPlace()
            .normalize();
          const position = pickResult.pickedPoint;
          const sourceMesh = pickResult.pickedMesh;
          let angle = 0;
          const decalSize = new BABYLON.Vector3(5, 5, 5);
          decal = BABYLON.MeshBuilder.CreateDecal(1009, sourceMesh, {
            position,
            normal,
            angle,
            size: decalSize,
            cullBackFaces: false,
            localMode: true,
          });
          decal.material = decalMaterial;
          decal.decalPositions = {
            normal: normal,
            position: position,
          };
        } else {
          if (decal) decal.dispose();
        }
      }
      count = (count + 1) % delay;
    };
  };

  attachPointerObserver = (scene) => {
    if (!scene) return;
    const pointerObserver = scene.onPointerObservable.add((pointerInfo) => {
      // if (this._store['activeImage'].length == 0) return;
      if (pointerInfo.type != PointerEventTypes.POINTERDOWN) return;
      if (
        pointerInfo.pickInfo.pickedMesh &&
        pointerInfo.pickInfo.pickedMesh.name === this._store['enabledMesh']
      ) {
        const d = new Date();
        const ms = d.getTime();

        var decalMaterial = new BABYLON.StandardMaterial(ms, scene);
        decalMaterial.diffuseTexture = new BABYLON.Texture(
          // 'scene/' + this._store['activeImage'],
          this._store['activeImage'],
          scene
        );
        decalMaterial.diffuseTexture.hasAlpha = true;
        decalMaterial.zOffset = -2;
        decalMaterial.backFaceCulling = false;
        this._store['decalMaterial'] = decalMaterial;

        const decalSize = new BABYLON.Vector3(5, 5, 5);
        const decalModel = BABYLON.MeshBuilder.CreateDecal(
          ms,
          pointerInfo.pickInfo.pickedMesh,
          {
            position: pointerInfo.pickInfo.pickedPoint,
            normal: pointerInfo.pickInfo.getNormal(true),
            size: decalSize,
            angle: 0,
            cullBackFaces: true,
          }
        );
        decalModel.material = this._store['decalMaterial'];

        decalModel.decalFace = this._store['enabledMesh'];
        decalModel.decalSize = decalSize;
        decalModel.decalAngle = 0;
        decalModel.decalImg = this._store['activeImage'];
        decalModel.decalPositions = {
          position: pointerInfo.pickInfo.pickedPoint,
          normal: pointerInfo.pickInfo.getNormal(true),
        };

        this.getValue(decalModel);
        this.setActiveDecal(decalModel.id);
        this.lastDecal(decalModel.id);
      }
    });
    return pointerObserver;
  };

  removeDecal = (scene, id) => {
    if (this._store['activeDecal'] === 0) return;

    const mesh = scene.getMeshById(id);
    mesh.dispose();

    this.deleteDecal(mesh.id);
  };

  setEnabledMesh = (enabledMeshName) => {
    this._store['enabledMesh'] = enabledMeshName;
  };

  setActiveImage = (image) => {
    if (image) {
      this._store['activeImage'] = image[0].url;
    } else {
      this._store['activeImage'] = 'scene/1.jpg';
    }
  };

  setActiveDecal = (id) => {
    this._store['activeDecal'] = id;
  };

  prevValues = (type) => {
    this.clicked.type = type;
  };

  setCanvasColor = (scene) => {
    this.refs.changeCanvasColorRef.current.addEventListener('click', () => {
      this._store['canvasColor'] = !this._store['canvasColor'];

      if (scene) {
        if (this._store['canvasColor'] === true) {
          scene.clearColor = new BABYLON.Color4(0, 0, 0, 0);
        } else {
          scene.clearColor = new BABYLON.Color4(255, 255, 255, 0);
        }
      }
    });
  };
}
