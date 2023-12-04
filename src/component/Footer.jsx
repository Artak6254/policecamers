import React from 'react';
import { Link } from 'react-router-dom';
const Footer = () => {
  return (
    <div className='bg-slate-800 w-full p-2 text-center border-b-2 border-gray-300 fixed bottom-0'>
            <Link to={"/"} className='text-white'>@ԿՏՎ 2023</Link>
          </div>
  );
};

export default Footer;
