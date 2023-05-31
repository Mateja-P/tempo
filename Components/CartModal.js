import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import cartImage from '../public/cart.svg';
import 'react-toastify/dist/ReactToastify.css';

const CartModal = ({ showModal, setShow, sendData, setSendData }) => {
  const { items } = useSelector((state) => state.cartProducts);

  const [message, setMessage] = useState('');

  const router = useRouter();

  const validateDataOnSubmit = (e) => {
    e.preventDefault();

    // const products = items.map(
    //   ({ productsImages, meshImgs, slike, ...item }) => item
    // );

    const products = items.map(({ productsImages, ...item }) => item);

    const payload = {
      sendData,
      products,
    };

    // .post(`http://localhost:8800/cart`, payload)
    axios
      .post(`http://localhost:3000/api/insertShopped`, payload)
      .then((res) => setMessage(res.data));
  };

  useEffect(() => {
    if (message !== '') {
      if (message.type === 'error') {
        toast.error(message.mess);
      } else if (message.type === 'success') {
        toast.success(message.mess);
        setSendData({
          ime: '',
          prezime: '',
          adresa: '',
          ipAdress: '',
          phone: '',
          email: '',
          napomena: '',
        });
      }
    }
  }, [message]);

  useEffect(() => {
    setSendData({
      ime: '',
      prezime: '',
      adresa: '',
      ipAdress: '',
      phone: '',
      email: '',
      napomena: '',
    });
  }, [showModal]);

  return (
    <Modal
      isOpen={showModal}
      overlayClassName='overlay-modal'
      className='fixed left-[50%] bottom-[50%] bg-[#fff] translate-x-[-50%] translate-y-[50%] outline-none p-2'
    >
      <div className='flex justify-end'>
        <div className='cursor-pointer' onClick={() => setShow(false)}>
          X
        </div>
      </div>
      <form
        className='flex flex-col px-5'
        onSubmit={(e) => validateDataOnSubmit(e)}
      >
        <input
          className='border border-black my-2 pl-1 py-1 px-10'
          type='text'
          placeholder='Ime'
          value={sendData.ime}
          onChange={(e) => {
            setSendData({
              ...sendData,
              ime: e.target.value,
            });
          }}
        />
        <input
          className='border border-black my-2 pl-1 py-1'
          type='text'
          placeholder='Prezime'
          value={sendData.prezime}
          onChange={(e) => {
            setSendData({
              ...sendData,
              prezime: e.target.value,
            });
          }}
        />
        <input
          className='border border-black my-2 pl-1 py-1'
          type='text'
          placeholder='Adresa'
          value={sendData.adresa}
          onChange={(e) => {
            setSendData({
              ...sendData,
              adresa: e.target.value,
            });
          }}
        />
        <input
          className='border border-black my-2 pl-1 py-1'
          type='text'
          placeholder='Postanski kod'
          value={sendData.ipAdress}
          onChange={(e) => {
            setSendData({
              ...sendData,
              ipAdress: e.target.value,
            });
          }}
        />
        <div>
          <input
            className='border border-black my-2 pl-1 py-1 w-full'
            type='text'
            placeholder='Telefon'
            value={sendData.phone}
            onChange={(e) => {
              setSendData({
                ...sendData,
                phone: e.target.value,
              });
            }}
          />
          <div className='text-[#AAAAAA] montserrat text-[12px]'>
            *Po potvrdi dobicete poziv na ovaj broj telefona, <br /> bez potvrde
            telefonom proizvodi se ne salju
          </div>
        </div>
        <input
          className='border border-black my-2 pl-1 py-1'
          type='text'
          placeholder='Email'
          value={sendData.email}
          onChange={(e) => {
            setSendData({
              ...sendData,
              email: e.target.value,
            });
          }}
        />
        <textarea
          className='border border-black my-2 pl-1 py-1'
          placeholder='Napomena'
          value={sendData.napomena}
          onChange={(e) => {
            setSendData({
              ...sendData,
              napomena: e.target.value,
            });
          }}
        ></textarea>
        <button className='bg-black text-white my-4 py-2 '>Potvrdi</button>
      </form>
    </Modal>
  );
};

export default CartModal;
