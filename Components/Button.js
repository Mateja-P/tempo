import { useState, useRef } from 'react';
import Link from 'next/link';
import image from '../public/rightArrow.svg';

const Button = ({ text, bck, onClick }) => {
  const [hovered, setHovered] = useState(false);
  const ref = useRef();

  return (
    <div
      onMouseEnter={() => {
        setHovered(true);
      }}
      onMouseLeave={() => {
        setHovered(false);
      }}
      className='inline-block relative z-[1] group/bttn cursor-pointer'
      onClick={onClick}
    >
      <div
        className={`${bck} flex items-center relative border border-black z-[1] px-4 py-2`}
      >
        <div className='nunito font-[700] mr-2 group-hover/bttn:mr-3 transition-all duration-600 ease-in'>
          {text}
        </div>
        <img className='w-[20px]' src={image.src} />
      </div>
      <div
        ref={ref}
        className={`group-hover/bttn:top-0 transition-all duration-600 ease-in  group-hover/bttn:left-0 absolute top-[7px] left-[7px] w-full h-full border border-black z-[0] `}
      ></div>
    </div>
  );
};

export default Button;
