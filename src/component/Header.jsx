import React from 'react';

const Header = ({ headData,searchText, setSearchText }) => {
  return (
    <div className="">
      <div className="bg-yellow-700 bg-yellow-700 w-full fixed top-0 z-50">
      <div className="max-w-[1100px] mx-auto flex justify-between items-center">
        {headData &&
          headData.map((el) => (
            <div key={el.id} className="flex items-center justify-between w-[58.2%]">
              <img
                src={`${el.logo}`}
                alt="logo"
                loading="lazy"
                className="w-[9%] lg:w-[6%] md:w-[8.3%]"
              />
              <h2 className="text-white lg:block md:block hidden">{el.heading}</h2>
            </div>
          ))}
           <div className="flex justify-end items-center">
          <input
            type="text"
            placeholder="Search regions"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="p-1 rounded-md w-[200px]"
          />
        </div>
      </div>
      </div>
    </div>
  );
};

export default Header;
