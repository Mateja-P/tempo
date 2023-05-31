import { useEffect, useState } from 'react';
import ProizovdiHeader from '@/Components/proizvodi/ProizvodiHeader';
// import productsImageMajca from '../public/HomePage/products4.png';
import Card from '@/Components/Card';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CloseIcon from '@mui/icons-material/Close';
import ScrollBar from '@/Components/ScrollBar';
import axios from 'axios';
import Head from 'next/head';
import { url } from '@/Credentials/url';

const proizvodi = () => {
  const [selectedCategory, setCategory] = useState('Sve');
  const [showCategory, setShow] = useState(false);
  const [closeModal, setClose] = useState(false);
  const [productsArr, setProducts] = useState([]);
  const [categoriesArr, setCategories] = useState([]);
  const [newProducts, setNewProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [reRender, setRender] = useState(false);
  let res;

  useEffect(() => {
    axios.get(`${url}proizvodi`).then((res) => {
      setProducts(res.data);
      setNewProducts(res.data);
    });
  }, []);

  useEffect(() => {
    axios.get(`${url}categories`).then((res) => setCategories(res.data));
  }, []);

  useEffect(() => {
    window.addEventListener('resize', () => {
      if (window.innerWidth <= 767) {
        setShow(true);
      } else {
        setShow(false);
      }
    });
  }, [showCategory]);

  const searchValue = (e) => {
    setSearch(e);
    setProducts(
      e !== ''
        ? productsArr.filter((el) => {
            return (
              el.modelName.toLowerCase().includes(e.toLowerCase()) ||
              el.categorie_id == selectedCategory
            );
          })
        : newProducts
    );

    setRender(!reRender);
  };

  res = () => {
    if (search !== '') {
      return productsArr.filter((e) => {
        return e.categories_id == selectedCategory;
      });
    } else {
      return newProducts.filter((e) => {
        return e.categories_id == selectedCategory;
      });
    }
  };

  return (
    <div>
      <Head>
        <title>BuzzMall.co - Proizvodi</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/HomePage/favicon.png' />
      </Head>
      <ScrollBar />
      <div
        className={`bg-primary relative py-3 ${
          closeModal ? 'hidden' : 'block'
        }`}
      >
        <div className='text-center nunito text-[13px]'>
          Novi proizvodi se ubacuju svake nedelje
        </div>
        <CloseIcon
          onClick={() => {
            setClose(true);
          }}
          className='absolute top-1 right-5 cursor-pointer'
        />
      </div>
      <ProizovdiHeader getSearch={searchValue} />
      <div className='flex md:flex-col'>
        <div className='border-r border-[#cdcdcd] px-20 pt-20 xl:px-14 lg:px-14 md:px-5 md:py-5 md:border-b md:border-r-white md:border-b-[#cdcdcd] sm:text-[14px]'>
          <div
            onClick={() => {
              if (window.innerWidth <= 767) {
                setShow(!showCategory);
              }
            }}
            className='font-[900]'
          >
            Kategorije
            <KeyboardArrowDownIcon
              className={`!hidden md:!inline-block transition-all duration-600 ease-in ${
                showCategory ? 'rotate-[0deg]' : 'rotate-[180deg]'
              }`}
            />
          </div>
          <div className={`pl-10 ${showCategory ? 'hidden' : 'block'}`}>
            <div
              className='flex my-5 items-center cursor-pointer'
              onClick={() => {
                setCategory('Sve');
              }}
            >
              <div
                className={`h-[15px] w-[15px] border border-black rounded-sm mr-2 ${
                  search == '' && selectedCategory == 'Sve'
                    ? 'bg-black'
                    : 'bg-transparent'
                }`}
              ></div>
              <div className='text-[14px]'>Sve</div>
            </div>
            {categoriesArr.map((e, index) => {
              return (
                <div
                  key={index}
                  className='flex my-5 items-center cursor-pointer'
                  onClick={() => {
                    setCategory(e.id);
                    setRender(!reRender);
                  }}
                >
                  <div
                    className={`h-[15px] w-[15px] border border-black rounded-sm mr-2 ${
                      search == '' && selectedCategory == e.id
                        ? 'bg-black'
                        : 'bg-transparent'
                    }`}
                  ></div>
                  <div className='text-[14px]'>{e.category}</div>
                </div>
              );
            })}
          </div>
        </div>
        <div className='grid gap-20 grid-cols-3 w-full px-52 py-20 2xl:px-12 xl:grid-cols-2 sm:w-[100%] sm:mx-auto sm:my-0 xs:w-[100%] sm:grid-cols-1'>
          {res().length != 0
            ? res().map((e, index) => {
                return <Card key={index} reRender={reRender} data={e} />;
              })
            : search !== ''
            ? productsArr.map((e, index) => {
                return <Card key={index} reRender={reRender} data={e} />;
              })
            : newProducts.map((e, index) => {
                return <Card key={index} reRender={reRender} data={e} />;
              })}
        </div>
      </div>
    </div>
  );
};

export default proizvodi;
