import React from 'react';
import { FaGithub } from 'react-icons/fa';
import { FiSettings } from 'react-icons/fi';
import { BsCloudSunFill } from 'react-icons/bs';
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex h-fit justify-between items-center m-5 leading-[1.2]">
      <a href="https://github.com/anshuthopsee/weather-now" className='flex gap-2 h-fit item font-bold underline cursor-pointer '>
        <FaGithub className='text-[30px] text-white cursor-pointer'/>
      </a>
      <div className='flex flex-col w-full items-center'>
        <div className='flex gap-1'>
          <div className='text-[28px] text-white flex items-center'>
            <BsCloudSunFill />
          </div>
          <span className="text-[28px] font-bold text-white font-pixelify m-0 p-0 relative top-[7px]">Weather Now</span>
        </div>
        <p className='text-[14px] text-white m-1 p-0'>powered by RapidAPI & OpenWeather</p>
      </div>
      <Link to='/settings' >
        <FiSettings className='text-[40px] text-white cursor-pointer hover:bg-white-opacity-20 p-2 rounded-full transition-all duration-300'/>
      </Link>
    </header>
  );
};

export default Header;