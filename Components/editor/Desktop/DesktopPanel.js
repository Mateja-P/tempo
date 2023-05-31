import React, { useEffect, useState } from 'react';
import addImage from '../../../public/editor/assets/addImage.svg';
import addSymbol from '../../../public/editor/assets/addSymbol.svg';
import addText from '../../../public/editor/assets/addText.svg';
import ImagesPanel from './Panels/ImagesPanel';

const DesktopPanel = React.forwardRef(function DesktopPanel({ imagesPanel }) {
  // const [activeTab, setTab] = useState('');
  const [activeTab, setTab] = useState('Images');

  return (
    <div className='flex h-full'>
      <div className='bg-[#2B2B2B] flex flex-col w-[100px] pt-3 gap-10 items-center'>
        <div onClick={() => setTab('Images')} className='cursor-pointer'>
          <img className='w-[35px]' src={addImage.src} />
        </div>
        {/* <div onClick={() => setTab('Text')} className='cursor-pointer'>
          <img className='w-[24px]' src={addText.src} />
        </div>
        <div onClick={() => setTab('Symbols')} className='cursor-pointer'>
          <img className='w-[35px]' src={addSymbol.src} />
        </div> */}
      </div>
      <div className='bg-[#1F1F1F] h-[100%] overflow-y-scroll'>
        <div className='border-b border-[#2B2B2B] w-[300px] py-6 text-[#A6A6A6] text-xl text-center'>
          {activeTab !== '' ? activeTab : 'Panel'}
        </div>
        {activeTab === 'Images' && (
          <div>
            <ImagesPanel
              setActiveImage={imagesPanel.setActiveImage}
              prevValues={imagesPanel.prevValues}
              setActiveDecal={imagesPanel.setActiveDecal}
            />
            {/* <button ref={refs.iScaleRef}>+</button> */}
            {/* <button ref={refs.dScaleRef}>-</button> */}
          </div>
        )}
      </div>
    </div>
  );
});

export default DesktopPanel;
