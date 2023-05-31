import cartImage from '../public/cart.svg';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

const Cart = ({ divStyle, imgStyle }) => {
  const { items } = useSelector((state) => state.cartProducts);

  const router = useRouter();

  return (
    <div
      className={divStyle}
      onClick={() => {
        router.push('/cart');
      }}
    >
      <img className={imgStyle} src={cartImage.src} />
      <div className='flex justify-center items-center rounded-full bg-red-500 cursor-pointer'>
        <p className='cursor-pointer'>{items.length > 0 && items.length}</p>
      </div>
    </div>
  );
};

export default Cart;
