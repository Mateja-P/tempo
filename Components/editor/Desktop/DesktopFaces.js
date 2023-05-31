import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { Tooltip } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { changeFace } from '@/Components/Context/editorRedux';

const DesktopFaces = ({ faces, id, setEnabledMesh }) => {
  const { face } = useSelector((state) => state.editor);

  const [openMenu, setOpenMenu] = useState(false);

  const dispatch = useDispatch();

  const cond =
    faces &&
    faces.map((e) => {
      return (
        <Tooltip title={e.faceName}>
          <p
            onClick={() => {
              setEnabledMesh(e.faceName);
              dispatch(changeFace(e.faceName));
            }}
            className='w-[50px] cursor-pointer'
          >
            {e.faceName}
          </p>
        </Tooltip>
      );
    });

  return (
    <div className='flex justify-center items-center gap-20'>
      Izaberana strana: {face}
      {/* <Modal
        isOpen={openMenu}
        overlayClassName='overlay-modal'
        className='fixed left-[50%] bottom-[50%] modal-bck translate-x-[-50%] outline-none'
      >
        <div className='outline-none p-5'>
          <div className='flex justify-between'>
            <h2 className='text-[20px] mb-10 font-[700]'>Faces</h2>
            <div
              className={`flex flex-col justify-between w-5 h-5 transition-all duration-600 ease-in cursor-pointer`}
              onClick={() => setOpenMenu(!openMenu)}
            >
              <div
                className={`w-full h-0.5 bg-black transition-all duration-600 ease-in ${
                  openMenu ? 'rotate-[-45deg] translate-y-[9px] bg-black' : ''
                }`}
              ></div>
              <div
                className={`w-full h-0.5 translate-x-1 bg-black transition-all duration-600 ease-in ${
                  openMenu ? 'opacity-0' : ''
                }`}
              ></div>
              <div
                className={`w-full h-0.5 bg-black transition-all duration-600 ease-in ${
                  openMenu ? 'rotate-45 translate-y-[-9px] bg-black' : ''
                }`}
              ></div>
            </div>
          </div>
          <div className='flex py-5 gap-20 pr-20'>{cond}</div>
        </div>
      </Modal> */}
      <div className='flex visible-scrollbar w-[400px] py-5 gap-12'>{cond}</div>
      {/* <div
        className={`flex flex-col justify-between w-5 h-5 transition-all duration-600 ease-in cursor-pointer`}
        onClick={() => setOpenMenu(!openMenu)}
      >
        <div
          className={`w-full h-0.5 bg-white transition-all duration-600 ease-in ${
            openMenu ? 'rotate-[-45deg] translate-y-[9px] bg-white' : ''
          }`}
        ></div>
        <div
          className={`w-full h-0.5 translate-x-1 bg-white transition-all duration-600 ease-in ${
            openMenu ? 'opacity-0' : ''
          }`}
        ></div>
        <div
          className={`w-full h-0.5 bg-white transition-all duration-600 ease-in ${
            openMenu ? 'rotate-45 translate-y-[-9px] bg-white' : ''
          }`}
        ></div>
      </div> */}
    </div>
  );
};

export default DesktopFaces;
