import { useState, useEffect } from 'react';

const ScrollBar = () => {
  const [scrolled, setScrolled] = useState(0);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      const scrollPx = document.documentElement.scrollTop;

      const childHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      const scrolledVal = (scrollPx / childHeight) * 100;

      setScrolled(scrolledVal);
    });
  }, [scrolled]);

  return (
    <div className='s-1' style={{}}>
      <div
        className='s-2'
        style={{
          height: scrolled + '%',
        }}
      ></div>
    </div>
  );
};

export default ScrollBar;
