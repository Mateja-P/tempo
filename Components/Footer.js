import Link from 'next/link';
import logo from '../public/HomePage/footerLogo.png';

const Footer = () => {
  return (
    <div className='bg-dark text-white py-7'>
      <div className='flex w-[70%] items-center mx-auto my-0 justify-between lg:w-[90%] md:w-[97%] sm:flex-col sm:items-start'>
        <div className='montserrat sm:my-3'>
          <img className='w-[85px]' src={logo.src} />{' '}
        </div>
        <div className='sm:my-3'>+381 62 843 18 54</div>
        <Link
          target='_blank'
          className='sm:my-3'
          href='https://mail.google.com/mail/u/5/#inbox?compose=GTvVlcRwQZjvVhhKZbpNKKVKmWztkRXZqxZMfHnMXkNsBwzLWkKkXVpzJbLqsLdkclQqHjRgGKGbg'
        >
          buzzmall.contact@gmail.com
        </Link>
        <div>
          {/* <Link className='block my-3' href='/'>
            Unesite svoje misljenje
          </Link> */}
          <Link
            target='_blank'
            className='block my-3'
            href='https://www.facebook.com/profile.php?id=100092751109099&is_tour_dismissed=true'
          >
            Facebook
          </Link>
          {/* <Link className='block' href='/'>
            Prijavite problem
          </Link> */}
          <Link
            target='_blank'
            className='block'
            href='https://www.instagram.com/buzzmall.co/'
          >
            Instagram
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
