import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getBackgroundColor } from '../features/settings/settingsSlice';
import Header from './Header';
import { FaGithub } from 'react-icons/fa';

const backgroundColors = {
  blue: 'from-custom-gradient-start-blue',
  green: 'from-custom-gradient-start-green',
  purple: 'from-custom-gradient-start-purple'
};

function Layout() {
  const backgroundColor = useSelector(getBackgroundColor);
  return (  
    <>
      <div className={`flex min-h-screen bg-gradient-to-b ${backgroundColors[backgroundColor]} to-custom-gradient-end flex-col`}>
        <Header/>
        <div className='container mx-auto px-4 grow flex flex-col'>
          <div className='flex-1'>
            <Outlet/>
          </div>
          <div className='flex w-full p-4 h-[60px] flex-0 text-white justify-center items-center'>
            <a href="https://github.com/anshuthopsee/weather-now" className='flex gap-2 h-fit item font-bold underline cursor-pointer '>
              <FaGithub className='text-[28px] text-white cursor-pointer'/>
              <p className='text-[14px] mt-[3px]'>anshuthopsee/weather-now</p>
            </a>
          </div> 
        </div>
      </div>
    </>
  );
};

export default Layout;