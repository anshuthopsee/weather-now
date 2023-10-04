import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { getTemperatureUnit, getWindSpeedUnit } from './settingsSlice';
import Tabs from './Tabs';
import { Link } from 'react-router-dom';

const SettingsMenu = () => {
  const temperatureUnit = useSelector(getTemperatureUnit);
  const windSpeedUnit = useSelector(getWindSpeedUnit);
  
  const menuItems = [
    {
      title: 'Temperature',
      categories: ['Celsius', 'Fahrenheit'],
      temperatureUnit
    },
    {
      title: 'Wind',
      categories: ['m/s', 'km/h'],
      windSpeedUnit
    }
  ];

  return (
    <div className='flex w-full justify-center'>
      <div className='w-[1024px] h-[400px] rounded-xl bg-white'>
        <p className='h-[50px] flex items-center font-bold text-gray-500 text-[22px] rounded-t-xl border-2 border-b-gray-400 px-4'>Settings</p>
        {menuItems.map((item, i) => {
          return <Tabs key={i} type={item}/>
        })}
        <div className='flex h-[155px] w-full rounded-b-xl bg-white items-end justify-end'>
          <Link to='/'>
            <button className='text-[18px] text-white bg-[#4834D4] rounded-lg font-bold p-2 m-3'>Go back</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SettingsMenu;