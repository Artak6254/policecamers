import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();
  return (
    <div className='bg-slate-800 w-full p-2 fixed bottom-0'>
            <Link to={"/"} className='flex justify-center items-center text-white'>@ԿՏՎ 2023</Link>
            <div className='flex justify-end items-center'>
              <button className='text-white cursor-pointer mt-[-21px]' onClick={() => navigate("/person")}>Անձնակազմ</button>
            </div>
          </div>
  );
};

export default Footer;
