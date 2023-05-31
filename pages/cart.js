import dynamic from 'next/dynamic';
import Footer from '@/Components/Footer';
import Header from '@/Components/Header';
import React, { useEffect, useRef, useState } from 'react';
import cartImg from '../public/cart.svg';
// import majcaImage from '../public/HomePage/products4.png';
// import duksiImage from '../public/HomePage/products1.png';
import ScrollBar from '@/Components/ScrollBar';
import { useSelector, useDispatch } from 'react-redux';
import { removeChanges } from '@/Components/Context/currentRedux';
import { removeItem, changeTotal } from '@/Components/Context/cartRedux';
import CartModal from '@/Components/CartModal';
import Head from 'next/head';
import { ToastContainer, toast } from 'react-toastify';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const productsObj = [
  {
    id: 1,
    name: 'Duks',
    // productImg: duksiImage,
    productImg: null,
    model: 'Sa kapuljacom',
    boja: 'siva',
    veicina: 'M',
    materijal: 'Pamuk',
    rod: 'muska',
    cena: 2300,
    cenaStampe: 180,
    minimalnaK: 1,
    total: 2300,
  },
  {
    id: 2,
    name: 'Majca',
    // productImg: majcaImage,
    productImg: null,
    model: 'Obicna',
    boja: 'crna',
    veicina: 'M',
    materijal: 'Pamuk',
    rod: 'muska',
    cena: 1500,
    cenaStampe: 180,
    minimalnaK: 1,
    total: 1500,
  },
];

const cart = () => {
  const { items } = useSelector((state) => state.cartProducts);

  const [products, setProducts] = useState(productsObj);
  const [reachBottom, setBottom] = useState(false);

  const [showModal, setShow] = useState(false);

  const [showAddedImages, setShowImages] = useState(false);

  let [sendData, setSendData] = useState({
    ime: '',
    prezime: '',
    adresa: '',
    ipAdress: '',
    phone: '',
    email: '',
    napomena: '',
  });

  const ref = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(removeChanges());
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.innerWidth <= 1279) {
        if (ref.current) {
          if (window.scrollY + window.innerHeight >= ref.current.offsetTop) {
            setBottom(true);
          } else {
            setBottom(false);
          }
        }
      }
    });
  }, [reachBottom]);

  const allTotal = () => {
    let sum = 0;

    items.forEach((e) => {
      sum += Number(e.total);
    });

    return sum;
  };

  const imagesSlider = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: true,
  };

  return (
    <div>
      <Head>
        <title>BuzzMall.co - Cart Page</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/HomePage/favicon.png' />
      </Head>
      <ToastContainer />
      <CartModal
        sendData={sendData}
        setSendData={setSendData}
        showModal={showModal}
        setShow={setShow}
      />
      <div
        className={`bg-[#ffffff36] left-0 w-full gap-5 hidden xl:flex justify-around py-6 fixed transition-all duration-1000 ease-in ${
          reachBottom ? 'bottom-[-100%]' : 'bottom-0'
        }`}
      >
        <div className='bg-black text-white py-3 px-14 montserrat sm:px-10 sm:text-[14px]'>
          Naruci
        </div>
        <div className='bg-black text-white py-3 px-14 montserrat sm:px-10 sm:text-[14px]'>
          Isplati
        </div>
      </div>
      <ScrollBar />
      <Header />
      <div className='pt-[150px] sm:pt-[100px]'>
        <div className='flex items-center justify-center gap-2 mb-[100px] sm:mb-[70px]'>
          <img className='w-[70px] sm:w-[40px]' src={cartImg.src} />
          <p className='montserrat font-[900] sm:text-[20px] text-[23px]'>
            Moja Korpa
          </p>
        </div>
        <div className='flex justify-between px-10 mb-[100px] gap-10 xl:flex-col sm:px-2'>
          <div className='flex-[1.5]'>
            {items.length > 0
              ? items.map((e) => {
                  return (
                    <div className='flex border-t border-[#cdcdcd] py-10 justify-between lg:flex-col'>
                      <div className='flex gap-5'>
                        {/* <div className='flex items-center p-2'> */}
                        <div className='w-[250px]'>
                          <Slider {...imagesSlider}>
                            {e.meshImgs.map((el) => {
                              return <img src={el} />;
                            })}
                          </Slider>
                        </div>
                        <div>
                          <h1 className='montserrat font-[600] text-[20px]'>
                            {e.name}
                          </h1>
                          <div className='my-5'>
                            <p className='text-[#777777] montserrat text-[14px] my-1'>
                              Model: <span>{e.model}</span>
                            </p>
                            <p className='text-[#777777] montserrat text-[14px] my-1'>
                              {e.boja && <span>Boja: {e.boja}</span>}
                            </p>
                            <p className='text-[#777777] montserrat text-[14px] my-1'>
                              {e.veicina && <span>Velicina: {e.veicina}</span>}
                            </p>
                            {/* <p className='text-[#777777] montserrat text-[14px] my-1'>
                              Materijal: <span>{e.materijal}</span>
                            </p> */}
                            <p className='text-[#777777] montserrat text-[14px] my-1'>
                              {e.rod && <span>Rod: {e.rod}</span>}
                            </p>
                          </div>
                          <div className='flex gap-4'>
                            {/* <div className='text-[#AAAAAA] montserrat text-[12px] cursor-pointer'>
                              Doradi
                            </div> */}
                            <div>
                              <div
                                className='text-[#AAAAAA] montserrat text-[12px] cursor-pointer mb-2'
                                onClick={() => setShowImages(!showAddedImages)}
                              >
                                Prikazi unete slike
                              </div>
                              <div className='flex'>
                                {showAddedImages &&
                                  e.slike.map((el) => {
                                    return (
                                      <img
                                        className='h-[50px] w-auto'
                                        src={el.url}
                                      />
                                    );
                                  })}
                              </div>
                            </div>
                            <div
                              onClick={() => {
                                dispatch(removeItem(e.id));
                                setProducts(
                                  products.filter((el) => {
                                    return el.id !== e.id;
                                  })
                                );
                              }}
                              className='text-[#AAAAAA] montserrat text-[12px] cursor-pointer'
                            >
                              Ukloni
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='flex flex-1 justify-between ml-32 lg:ml-0 lg:mt-10'>
                        <div>
                          <div className='mb-5'>
                            <p className='montserrat text-[14px]  xs:text-[12px]'>
                              Jedan proizvod
                            </p>
                            <p className='montserrat text-[14px]  xs:text-[12px]'>
                              {e.cena} din
                            </p>
                          </div>
                          <div>
                            <p className='montserrat text-[14px]  xs:text-[12px]'>
                              Cena stampe
                            </p>
                            <p className='montserrat text-[14px]  xs:text-[12px]'>
                              {e.cenaStampe} din
                            </p>
                          </div>
                        </div>
                        <div>
                          <form
                            onSubmit={(e) => e.preventDefault()}
                            className='mb-5'
                          >
                            <label className='montserrat text-[14px] block mb-1  xs:text-[12px]'>
                              Kolicina
                            </label>
                            <input
                              className='border border-black placeholder:text-[13px] p-1 rounded-md sm:w-[150px]'
                              type='number'
                              min={e.minimalnaK}
                              placeholder='Izaberi kolicinu'
                              onChange={(event) => {
                                dispatch(
                                  changeTotal({
                                    id: e.id,
                                    price: e.cena,
                                    quantity: event.target.value,
                                  })
                                );

                                setSendData({
                                  ...sendData,
                                  total: allTotal(),
                                });

                                setProducts(
                                  products.map((item) => {
                                    if (item.id === e.id) {
                                      return {
                                        ...item,
                                        quantity: event.target.value,
                                        total: e.cena * event.target.value,
                                      };
                                    } else {
                                      return item;
                                    }
                                  })
                                );
                              }}
                            />
                          </form>
                          <div>
                            <p className='montserrat text-[14px]  xs:text-[12px]'>
                              Minimalna kolicina
                            </p>
                            <p className='montserrat text-[14px]  xs:text-[12px]'>
                              {e.minimalnaK}
                            </p>
                          </div>
                        </div>
                        <div>
                          <p className='montserrat text-[14px] xs:text-[12px]'>
                            Ukupno
                          </p>
                          {/* <p>{cena * kolicina}</p> */}
                          <p className='montserrat text-[14px] xs:text-[12px]'>
                            {e.total ? e.total : e.minimalnaK * e.cena} din
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })
              : 'Nema proizvoda u korpi'}
            <div className='flex justify-between pl-[200px] border-t border-[#cdcdcd] pt-5 xl:hidden'>
              <div className='montserrat font-[600]'>
                {items.length} Proizvoda
              </div>
              <div className='montserrat font-[600]'>{allTotal() + 'din'}</div>
            </div>
          </div>
          <div
            ref={ref}
            className='flex-[0.5] xl:w-1/2 sm:w-full xl:mx-auto xl:my-0'
          >
            {items.length > 0 ? (
              <div>
                <div className='flex justify-between mb-10'>
                  <div className='montserrat font-[600]'>Ukupna cena</div>
                  <div className='montserrat font-[600]'>
                    {allTotal() + 'din'}
                  </div>
                </div>
                <div>
                  {/* <div className='mb-5'>
                    <p className='montserrat text-[13px]'>Plati karticom</p>
                    <div className='cursor-pointer bg-black text-white montserrat text-center py-3'>
                      Isplati
                    </div>
                  </div> */}
                  <div>
                    <p className='montserrat text-[13px]'>Plati pouzecem</p>
                    <div
                      onClick={() => {
                        setShow(true);
                      }}
                      className='bg-black cursor-pointer text-white montserrat text-center py-3'
                    >
                      Naruci
                    </div>
                  </div>
                </div>
                <p className='text-[#AAAAAA] text-[12px] mt-4'>
                  *Rok isporuke od 3 do 5 dana
                </p>
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default cart;