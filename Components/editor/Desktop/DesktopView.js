import dynamic from 'next/dynamic';
import React, { useEffect, useState, useRef, useId } from 'react';
import Controller from '../Controller';
import DesktopPanel from './DesktopPanel';
import { useRouter } from 'next/router';
import axios from 'axios';
import DesktopFaces from './DesktopFaces';
import { Scene, Engine } from 'react-babylonjs';
import { Vector3 } from '@babylonjs/core';
import M from '@/Components/editor/M';
import { useDispatch } from 'react-redux';
import {
  addDecals,
  setActiveDecalR,
  removeDecal,
} from '@/Components/Context/editorRedux';
import { addProductInCart } from '@/Components/Context/cartRedux';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import Modal from 'react-modal';
import { url } from '@/Credentials/url';

const CanvasD = dynamic(() => import('@/Components/editor/SceneComponent'), {
  ssr: false,
});

const DesktopView = ({ meshColor, size, gender }) => {
  const { items } = useSelector((state) => state.cartProducts);

  const [data, setData] = useState([]);
  const [openFunctionlity, setOpenFunctionlity] = useState(false);

  const iScaleRef = useRef();
  const dScaleRef = useRef();
  const iMoveXRef = useRef();
  const dMoveXRef = useRef();
  const iMoveYRef = useRef();
  const dMoveYRef = useRef();
  const iRotateRef = useRef();
  const dRotateRef = useRef();
  const removeRef = useRef();
  const changeCanvasColorRef = useRef();

  const router = useRouter();

  const productId = useId();

  const id = router.query.pid;
  const dispatch = useDispatch();

  useEffect(() => {
    // axios
    //   .get(`http://localhost:8800/editor?pid=${id}`)
    //   .then((res) => setData(res.data));
    axios.get(`${url}editor/${id}`).then((res) => setData(res.data));
  }, []);

  const productInfoObject = {
    id: productId,
    promoId: data[0] && data[0].promoId,
    productsImages: data[0] && data[0].productsImage,
    model: data[0] && data[0].modelName,
    cena: data[0] && data[0].price,
    cenaStampe: 180,
    minimalnaK: 1,
    veicina: size,
    rod: gender,
    total: Number(data[0] && data[0].price),
  };

  const refs = {
    iScaleRef,
    dScaleRef,
    iMoveXRef,
    dMoveXRef,
    iMoveYRef,
    dMoveYRef,
    iRotateRef,
    dRotateRef,
    removeRef,
    changeCanvasColorRef,
  };

  const insertCartId = items.length + 1;

  const controller = new Controller(
    data[0] && data[0].model,
    data[0] && data[0].defaultName,
    data[0] && data[0].id,
    getValue,
    lastDecal,
    deleteDecal,
    meshColor,
    setItemsInfo,
    router,
    productInfoObject,
    refs,
    insertCartId
  );

  function getValue(val) {
    dispatch(addDecals(val));
  }

  function lastDecal(val) {
    dispatch(setActiveDecalR(val));
  }

  function deleteDecal(val) {
    dispatch(removeDecal(val));
  }

  function setItemsInfo(val) {
    dispatch(addProductInCart(val));
  }

  const faces = data[0] && JSON.parse(data[0].faces);

  const onSceneReady = (scene) => {
    controller.attachScene(scene);
  };

  const model = data[0] && data[0].model;

  const functionalityModal = (
    <Modal
      isOpen={openFunctionlity}
      overlayClassName='overlay-modal'
      className='fixed left-[50%] bottom-[50%] modal-bck translate-x-[-50%] translate-y-[50%] outline-none px-2'
    >
      <div className='flex justify-end'>
        <div
          className='cursor-pointer p-2'
          onClick={() => setOpenFunctionlity(false)}
        >
          X
        </div>
      </div>
      <div className='text-xl font-bold'>
        Ovako se koristi prva verzija softvera:
      </div>
      <div className='my-5'>
        <div className='text-lg'>1. Ubaci sliku</div>
        <div className='text-xs'>
          Kliknite na choose file i izaberite slike. Nakon toga samo kliknite
          Add Image (samo png i jpg slike su dozvoljene).
        </div>
      </div>
      <div className='my-5'>
        <div className='text-lg'>2. Stavite sliku na model</div>
        <div className='text-xs'>
          U donjem panelu izaberite stranicu. Na klik modela, slika će se
          postaviti na izabrano mesto.
        </div>
      </div>
      <div className='my-5'>
        <div className='text-lg'>3. Manipulišite slikom</div>
        <div className='text-xs'>
          U desnom panelu se nalaze komande za manipulaciju. Samo izaberite
          jednu od postavljenih slika iz panela sa leve strane i kliknite na
          željenu manipulaciju.
        </div>
      </div>
      <div className='my-5'>
        <div className='text-lg'>4. Obrišite sliku</div>
        <div className='text-xs'>
          Iz levog panela izaberite sliku, na klik Ukloni sliku u panelu sa
          desne strane, slika će biti obrisana
        </div>
      </div>
    </Modal>
  );

  return (
    <>
      {model ? (
        <div className='bg-[#000] text-white h-screen flex p-2'>
          <div>
            <DesktopPanel
              imagesPanel={{
                setActiveImage: controller.setActiveImage,
                prevValues: controller.prevValues,
                setActiveDecal: controller.setActiveDecal,
              }}
            />
          </div>
          <div className='flex-1'>
            <div className='flex justify-between pr-10 pl-5 py-2 items-center'>
              <div className='text-red-400'>
                Ovo je prva verzija softvera pa su bagovi mogući. Materijali i
                boje proizvoda ne pretstavljaju proizvod 100% tačno.
              </div>
              {functionalityModal}
              <div
                className='cursor-pointer text-xs text-[#bebebe]'
                onClick={() => setOpenFunctionlity(true)}
              >
                Kako se koristi softver?
              </div>
              {/* <div
                ref={finishedRef}
                // href='/cart'
                className='cursor-pointer'
                onClick={() => {
                  const allImages = window.localStorage.getItem('allImages');
                  const imgs = JSON.parse(allImages);
                  dispatch(
                    addProductInCart({
                      id: productId,
                      model: data[0] && data[0].model,
                      color: meshColor,
                      cena: data[0] && data[0].price,
                      cenaStampe: 180,
                      minimalnaK: 1,
                      veicina: size,
                      rod: gender,
                      slike: imgs,
                      total: data[0] && data[0].price,
                    })
                  );
                }}
              >
                Finshed
              </div> */}
            </div>
            <div className='flex justify-center flex-col mt-10'>
              <CanvasD
                onSceneReady={onSceneReady}
                style={{ width: '100%' }}
                id='desktop-canvas'
              />
              <DesktopFaces
                setEnabledMesh={controller.setEnabledMesh}
                faces={faces !== undefined && faces.properties}
                id={data[0] && data[0].id}
              />
            </div>
          </div>
          <div className='flex flex-col items-center justify-center h-full'>
            <div className='mb-5'>Manipulacije</div>
            <div className='flex gap-3 my-2'>
              <button
                ref={iScaleRef}
                className='px-2 py rounded-full border border-[#222]'
              >
                +
              </button>
              <div>Povećaj</div>
              <button
                ref={dScaleRef}
                className='px-2 py rounded-full border border-[#222]'
              >
                -
              </button>
            </div>
            <div className='flex gap-3 my-2'>
              <button
                ref={iMoveXRef}
                className='px-2 py rounded-full border border-[#222]'
              >
                +
              </button>
              <div>Pomeri X</div>
              <button
                ref={dMoveXRef}
                className='px-2 py rounded-full border border-[#222]'
              >
                -
              </button>
            </div>
            <div className='flex gap-3 my-2'>
              <button
                ref={iMoveYRef}
                className='px-2 py rounded-full border border-[#222]'
              >
                +
              </button>
              <div>Pomeri Y</div>
              <button
                ref={dMoveYRef}
                className='px-2 py rounded-full border border-[#222]'
              >
                -
              </button>
            </div>
            <div className='flex gap-3 my-2'>
              <button
                ref={iRotateRef}
                className='px-2 py rounded-full border border-[#222]'
              >
                +
              </button>
              <div>Rotiraj</div>
              <button
                ref={dRotateRef}
                className='px-2 py rounded-full border border-[#222]'
              >
                -
              </button>
            </div>
            <div className='cursor-pointer' ref={removeRef}>
              Ukloni sliku
            </div>
            <div
              ref={changeCanvasColorRef}
              className='text-xs mt-10 text-center cursor-pointer'
            >
              Promeni pozadinu <br /> canvasa
            </div>
          </div>
        </div>
      ) : (
        'Greska u serveru pri dobavljanju podataka, pokusajte da refreshujete browser'
      )}
    </>
  );
};

export default DesktopView;
