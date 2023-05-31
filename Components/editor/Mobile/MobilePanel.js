import React, { useState } from 'react';
import Modal from 'react-modal';

//Na active image, text ili symbol izlazi se iz modala i taj aktivni se priakzuje na dnu ekrana

const MobilePanel = ({ faces, id }) => {
  const [activeFaces, setActiveFaces] = useState(false);
  const [activeImages, setActiveImages] = useState(false);
  const [activeText, setActiveText] = useState(false);
  const [activeSymbols, setActiveSymbols] = useState(false);

  const faceEl = (
    <Modal isOpen={activeFaces}>
      <div
        className={`flex flex-col justify-between w-5 h-5 transition-all duration-600 ease-in cursor-pointer`}
        onClick={() => setActiveFaces(!activeFaces)}
      >
        <div
          className={`w-full h-0.5 bg-black transition-all duration-600 ease-in ${
            activeFaces ? 'rotate-[-45deg] translate-y-[9px] bg-black' : ''
          }`}
        ></div>
        <div
          className={`w-full h-0.5 translate-x-1 bg-black transition-all duration-600 ease-in ${
            activeFaces ? 'opacity-0' : ''
          }`}
        ></div>
        <div
          className={`w-full h-0.5 bg-black transition-all duration-600 ease-in ${
            activeFaces ? 'rotate-45 translate-y-[-9px] bg-black' : ''
          }`}
        ></div>
      </div>
      <div>
        <div>Faces</div>
        {faces &&
          faces.map((e) => {
            return (
              <img
                className='w-[50px] cursor-pointer'
                src={`editor/faces/${id}/${e.faceImage}`}
              />
            );
          })}
      </div>
    </Modal>
  );

  const imageEl = (
    <Modal isOpen={activeImages}>
      <div
        className={`flex flex-col justify-between w-5 h-5 transition-all duration-600 ease-in cursor-pointer`}
        onClick={() => setActiveImages(!activeImages)}
      >
        <div
          className={`w-full h-0.5 bg-black transition-all duration-600 ease-in ${
            activeImages ? 'rotate-[-45deg] translate-y-[9px] bg-black' : ''
          }`}
        ></div>
        <div
          className={`w-full h-0.5 translate-x-1 bg-black transition-all duration-600 ease-in ${
            activeImages ? 'opacity-0' : ''
          }`}
        ></div>
        <div
          className={`w-full h-0.5 bg-black transition-all duration-600 ease-in ${
            activeImages ? 'rotate-45 translate-y-[-9px] bg-black' : ''
          }`}
        ></div>
      </div>
      <div>
        <div>Images</div>
        <form>
          <input type='file' />
        </form>
      </div>
    </Modal>
  );

  const textEl = (
    <Modal isOpen={activeText}>
      <div
        className={`flex flex-col justify-between w-5 h-5 transition-all duration-600 ease-in cursor-pointer`}
        onClick={() => setActiveText(!activeText)}
      >
        <div
          className={`w-full h-0.5 bg-black transition-all duration-600 ease-in ${
            activeText ? 'rotate-[-45deg] translate-y-[9px] bg-black' : ''
          }`}
        ></div>
        <div
          className={`w-full h-0.5 translate-x-1 bg-black transition-all duration-600 ease-in ${
            activeText ? 'opacity-0' : ''
          }`}
        ></div>
        <div
          className={`w-full h-0.5 bg-black transition-all duration-600 ease-in ${
            activeText ? 'rotate-45 translate-y-[-9px] bg-black' : ''
          }`}
        ></div>
      </div>
      <div>
        <div>Text</div>
        <div>Functionality for text</div>
      </div>
    </Modal>
  );

  const symbolsEl = (
    <Modal isOpen={activeSymbols}>
      <div
        className={`flex flex-col justify-between w-5 h-5 transition-all duration-600 ease-in cursor-pointer`}
        onClick={() => setActiveSymbols(!activeSymbols)}
      >
        <div
          className={`w-full h-0.5 bg-black transition-all duration-600 ease-in ${
            activeSymbols ? 'rotate-[-45deg] translate-y-[9px] bg-black' : ''
          }`}
        ></div>
        <div
          className={`w-full h-0.5 translate-x-1 bg-black transition-all duration-600 ease-in ${
            activeSymbols ? 'opacity-0' : ''
          }`}
        ></div>
        <div
          className={`w-full h-0.5 bg-black transition-all duration-600 ease-in ${
            activeSymbols ? 'rotate-45 translate-y-[-9px] bg-black' : ''
          }`}
        ></div>
      </div>
      <div>
        <div>Symbols</div>
        <div>Symbols from the object of all symbols</div>
      </div>
    </Modal>
  );

  return (
    <div className='text-black flex'>
      {activeFaces && faceEl}
      {activeImages && imageEl}
      {activeText && textEl}
      {activeSymbols && symbolsEl}
      <div
        className='border border-black bg-white flex-1 py-5 text-center text-sm font-[600]'
        onClick={() => setActiveFaces(!activeFaces)}
      >
        Faces
      </div>
      <div
        className='border border-black bg-white flex-1 py-5 text-center text-sm font-[600]'
        onClick={() => setActiveImages(!activeImages)}
      >
        Images
      </div>
      <div
        className='border border-black bg-white flex-1 py-5 text-center text-sm font-[600]'
        onClick={() => setActiveText(!activeText)}
      >
        Text
      </div>
      <div
        className='border border-black bg-white flex-1 py-5 text-center text-sm font-[600]'
        onClick={() => setActiveSymbols(!activeSymbols)}
      >
        Symbols
      </div>
    </div>
  );
};

export default MobilePanel;
