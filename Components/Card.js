import React, { useEffect, useState } from 'react';
import starImage from '../public/star.svg';
import { useRouter } from 'next/router';
import axios from 'axios';

const Card = ({ data, reRender }) => {
  // const [subProds, setSub] = useState([]);
  const e = data;

  const router = useRouter();

  const images = e && JSON.parse(e.productsImage);
  const image = images.properties[0];

  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:8800/card/${e.id}`)
  //     .then((res) => setSub(res.data));
  // }, [reRender]);

  return (
    <div>
      <div className='bg-white pb-5'>
        <div className='flex justify-end mb-14 sm:mb-7'>
          <div
            className={`py-2 px-6 border  bg-white montserrat font-[600] text-[13px] md:px-3 md:text-[10px] ${
              e.mostPopular
                ? 'border-red-500 text-red-500'
                : 'border-white h-[40px] w-[130px]'
            }`}
          >
            {/* {e.mostPopular && 'Most popular'} */}
            {e.mostPopular && 'Available'}
          </div>
        </div>
        <div className='relative w-[300px] mb-16 md:flex md:justify-center sm:w-auto sm:mb-10'>
          <img
            className='w-full'
            // src={`Products/${e.id + '.png'}`}
            src={`productsImages/${e.promoId}/${image}`}
          />
        </div>
        <div className='px-3'>
          <h1 className='montserrat font-[600] text-[21px] sm:text-[18px] mb-5 sm:mb-2'>
            {e.modelName}
          </h1>
          <div>{e.price} din</div>
          {/* <h4 className='text-[15px] font-[500] mb-3 sm:text-[13px] xs:text-[12px]'>
            Modela: {subProds.length}
          </h4>
          <div className='flex sm:flex-col sm:gap-2'>
            <h4 className='text-[15px] mr-3 sm:text-[13px] xs:text-[12px]'>
              AVG. Rating
            </h4>
            {e.avgRating && (
              <div className='flex'>
                <img className='w-[20px] xs:w-[15px]' src={starImage.src} />
                <img className='w-[20px] xs:w-[15px]' src={starImage.src} />
                <img className='w-[20px] xs:w-[15px]' src={starImage.src} />
                <img className='w-[20px] xs:w-[15px]' src={starImage.src} />
                <img className='w-[20px] xs:w-[15px]' src={starImage.src} />
              </div>
            )}
          </div> */}
          <div
            className='cursor-pointer w-full mt-10 sm:mt-4 montserrat py-3 sm:text-[13px] xs:text-[11px] bg-white border border-black text-center'
            onClick={() => {
              router.push(`/p/${e.id}`);
            }}
          >
            Pogledaj
          </div>
          {/* <form
            className='w-full mt-10 sm:mt-4'
            onSubmit={(e) => e.preventDefault()}
          >
            <select
              onChange={(event) => {
                router.push(`/p/${event.target.value}`);
              }}
              className='montserrat w-full py-3 sm:text-[13px] xs:text-[11px]'
            >
              <option>Izaberi Model</option>
              {subProds[0] &&
                subProds.map((e) => {
                  return <option value={e.id}>{e.modelName}</option>;
                })}
            </select>
          </form> */}
        </div>
      </div>
    </div>
  );
};

export default Card;
