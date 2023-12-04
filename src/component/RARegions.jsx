import React from 'react';
import { Link } from 'react-router-dom';



const RARegions = ({ filteredRegions }) => {


  return (
    <div className="bg-slate-100 w-full h-auto">
      <div className="max-w-[1400px] mx-auto py-[6rem] ">
        <div className="grid lg:grid-cols-10 md:grid-cols-4 place-content-center sm:grid-cols-2 grid-cols-1 gap-x-2 gap-y-4 transition-all ease-linear duration-500">
          {filteredRegions.map((el) => (
            <Link
              to={`${el.link}`}
              target="_blank"
              key={el.id}
              className="flex flex-col items-center rounded-full"
            >
              <img
                src={`${el?.image}`}
                alt="regions"
                loading="lazy"
                className="w-[70px] rounded-full bg-white p-3 mb-2"
              />
              <p>{el?.title}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RARegions;
