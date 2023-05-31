import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import cartImage from '../public/cart.svg';
import { useRouter } from 'next/router';
import Cart from './Cart';
import logo from '../public/HomePage/logo.png';

const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [sticky, setSticky] = useState(true);

  const router = useRouter();

  const headerRef = useRef();

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY < 1) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    });
  }, [sticky]);

  return (
    <div
      ref={headerRef}
      className={`${
        sticky ? 'bg-[#ffffff36]' : 'bg-[#fff] py-4'
      } py-3 fixed w-full z-[999] transition-all duration-600 ease-in`}
    >
      <div className='flex justify-between w-[80%] my-0 mx-auto items-center z-[999] md:w-[97%]'>
        <div className='z-[999] sm:w-[100px] xs:w-[85px]'>
          <img className='w-[75px]' src={logo.src} />
          {/* BuzzMall */}
        </div>
        <div
          className={`flex gap-8 md:absolute transition-all duration-300 ease-in ${
            openMenu ? 'md:top-full' : 'md:top-[-300%]'
          } 
           md:flex-col md:bg-primary md:justify-center md:items-end md:pr-3 md:w-[97%] md:py-7 `}
        >
          <Link
            className={`montserrat text-[15px] 2xl:text-[13px] md:text-[16px] sm:text-[16px] md:border-b md:border-black md:px-3 md:py-2 ${
              sticky ? 'font-[500]' : 'font-[600]'
            }`}
            href='/'
          >
            Pocetna
          </Link>
          <Link
            className={`montserrat text-[15px] 2xl:text-[13px] md:text-[16px] font-[400] sm:text-[16px] md:border-b md:border-black md:px-3 md:py-2 ${
              sticky ? 'font-[500]' : 'font-[600]'
            }`}
            href='/proizvodi'
          >
            Proizvodi
          </Link>
        </div>
        <Cart
          divStyle={'z-[999]'}
          imgStyle={'w-[40px] 2xl:w-[35px] cursor-pointer'}
        />
        {/* <div
          className='z-[999]'
          onClick={() => {
            router.push('/cart');
          }}
        >
          <img
            className='w-[40px] 2xl:w-[35px] cursor-pointer'
            src={cartImage.src}
          />
        </div> */}
        <div
          className={`hidden md:flex md:flex-col md:justify-between md:w-5 md:h-5 transition-all duration-600 ease-in md:z-[999]`}
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
    </div>
  );
};

export default Header;
