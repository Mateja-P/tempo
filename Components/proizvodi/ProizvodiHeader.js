import { useState, useEffect, useRef } from 'react';
import cartImage from '../../public/cart.svg';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import { useRouter } from 'next/router';
import Cart from '../Cart';
import logo from '../../public/HomePage/logo.png';

const ProizovdiHeader = ({ getSearch }) => {
  const handleSearch = (e) => {
    getSearch(e.target.value);
  };
  const router = useRouter();

  return (
    <div>
      <div className='flex justify-between items-center px-14 py-5 border-b border-[#CDCDCD] lg:px-6 md:hidden'>
        <div className='mr-20 lg:mr-10'>
          <img className='w-[75px]' src={logo.src} />
        </div>
        <div className='flex-1 flex items-center'>
          <form
            onSubmit={(e) => e.preventDefault()}
            className='border border-black w-full flex relative h-[38px] items-center rounded-md px-2'
          >
            <SearchIcon className='!text-[20px]' />
            <input
              onChange={(e) => handleSearch(e)}
              className='pl-2 w-full h-full flex-1 placeholder:text-[13px] outline-none'
              type='text'
              placeholder='Pretrazi proizvode...'
            />
          </form>
          <div
            onClick={() => router.push('/')}
            className='ml-5 border border-black px-4 py-2 rounded-md text-[13px]  cursor-pointer'
          >
            Nazad
          </div>
        </div>
        <Cart
          divStyle={'ml-20 lg:ml-10 cursor-pointer'}
          imgStyle={'w-[30px]'}
        />
        {/* <div
          className='ml-20 lg:ml-10 cursor-pointer'
          onClick={() => router.push('/cart')}
        >
          <img className='w-[30px]' src={cartImage.src} />
        </div> */}
      </div>
      <div className='hidden md:block px-5 py-5 border-b border-[#CDCDCD]'>
        <div className='flex justify-between mb-5'>
          <div>
            <img className='w-[55px]' src={logo.src} />
          </div>
          <Cart
            divStyle={'ml-20 lg:ml-10 cursor-pointer'}
            imgStyle={'w-[30px]'}
          />
          {/* <div
            className='ml-20 lg:ml-10 cursor-pointer'
            onClick={() => router.push('/cart')}
          >
            <img className='w-[30px]' src={cartImage.src} />
          </div> */}
          <div
            onClick={() => router.push('/')}
            className='ml-5 border border-black px-4 py-2 rounded-md text-[11px] flex items-center'
          >
            Nazad
          </div>
        </div>
        <form
          onSubmit={(e) => e.preventDefault()}
          className='border border-black w-full flex relative h-[38px] items-center rounded-md px-2'
        >
          <SearchIcon className='!text-[20px]' />
          <input
            onChange={(e) => handleSearch(e)}
            className='pl-2 w-full h-full flex-1 placeholder:text-[13px] outline-none'
            type='text'
            placeholder='Pretrazi proizvode...'
          />
        </form>
      </div>
    </div>
  );
};

export default ProizovdiHeader;
