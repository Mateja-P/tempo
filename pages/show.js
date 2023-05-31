import React, { useEffect, useState } from 'react';
import axios from 'axios';

const show = () => {
  const [state, setState] = useState();

  useEffect(() => {
    // axios.get('http://localhost:8800/show').then((res) => setState(res.data));
    axios
      .get('http://localhost:3000/api/show')
      .then((res) => setState(res.data));
  }, []);
  return (
    <div>
      {state &&
        state.map((e) => {
          const objProducts = JSON.parse(e.products);
          const d = new Date(e.date);
          const day = d.getDate();
          const month = d.getMonth() + 1;
          const year = d.getFullYear();
          const hours = d.getHours();
          const mins = d.getMinutes();

          return (
            <div className='border border-black my-5'>
              <div className='flex gap-10'>
                <div>Porudzbina: {e.id}</div>
                <div>Kome: {e.Ime}</div>
                <div>
                  Gde: {e.adress} - {e.postalCode}
                </div>
                <div>Telefon: {e.phone}</div>
                <div>Email: {e.email}</div>
                <div>Napomena: {e.note}</div>
                <div>
                  Naruceno: {day}.{month}.{year} u {hours}:{mins}
                </div>
                <div>Platio: {e.payed}din</div>
              </div>
              <div>
                <div>Proizvodi i slike:</div>
                <div className='inline-flex flex-col'>
                  {objProducts.length > 0 &&
                    objProducts.map((el, index) => {
                      const images = el.slike;
                      const products = el.meshImgs;
                      const a = [images, products];
                      return (
                        <div className='border border-red-400 flex'>
                          pId: {el.id}. <br /> promoId: {el.promoId} <br />
                          <br /> colorId: {el.colorId && el.colorId} <br />
                          kolicina:
                          {el.quantity ? el.quantity : 1} <br />
                          cena komada: {el.cena}
                          {a[0] &&
                            a[1] &&
                            a.map((element) => {
                              return (
                                <div className='flex flex-col'>
                                  {element.map((ele) => {
                                    return typeof ele === 'object' ? (
                                      <img
                                        className='w-[100px]'
                                        src={ele.url}
                                      />
                                    ) : (
                                      <img className='w-[100px]' src={ele} />
                                    );
                                  })}
                                </div>
                              );
                            })}
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          );
          // if (objProducts.length > 0) {
          //   return objProducts.map((el) => {
          //     if (el.meshImgs) {
          //       console.log(el);
          //       return el.meshImgs.map((img) => {
          //         return <img className='w-[100px]' src={img} />;
          //       });
          //     }
          //   });
          // }
        })}
    </div>
  );
};

export default show;
