import { useDispatch, useSelector } from 'react-redux';
import { getTemperatureUnit, getWindSpeedUnit, getBackgroundColor, setBackgroundColor } from './settingsSlice';
import Tabs from './Tabs';
import { Link } from 'react-router-dom';
import { BsCheckLg } from 'react-icons/bs';

const SettingsMenu = () => {
  const dispatch = useDispatch();
  const temperatureUnit = useSelector(getTemperatureUnit);
  const windSpeedUnit = useSelector(getWindSpeedUnit);
  const backgroundColor = useSelector(getBackgroundColor);
  
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

  const backgroundColors = [
    {
      name: 'blue',
      class: 'from-custom-gradient-start-blue'
    },
    {
      name: 'green',
      class: 'from-custom-gradient-start-green'
    },
    {
      name: 'purple',
      class: 'from-custom-gradient-start-purple'
    }
  ];

  return (
    <div className='flex w-full justify-center'>
      <div className='w-[1024px] h-[400px] rounded-xl bg-white'>
        <p className='h-[50px] flex items-center font-bold text-gray-500 text-[22px] rounded-t-xl border-2 border-b-gray-400 px-4'>Settings</p>
        {menuItems.map((item, i) => {
          return <Tabs key={i} type={item}/>
        })}
        <p className='h-[50px] px-6 flex items-center text-gray-500 font-bold text-[18px]'>Background Color</p>
        <div className='flex w-full items-center gap-3 mx-4'>
          {backgroundColors.map((item, i) => {
            return (
              <div 
                key={i} 
                className={`w-[70px] h-[70px] cursor-pointer rounded-xl bg-gradient-to-b ${item.class} to-custom-gradient-end relative ${backgroundColor === item.name ? "outline outline-offset-2 outline-blue-600" : "" }`}
                onClick={() => dispatch(setBackgroundColor(item.name))}
              >
                {backgroundColor === item.name && <BsCheckLg className='text-white p-4 h-full w-full items-center justify-center absolute'/>}
              </div>
            )
          })}
        </div>
        <div className='flex h-[100px] w-full rounded-b-xl bg-white items-end justify-end'>
          <Link to='/'>
            <button className='text-[18px] text-white bg-[#4834D4] rounded-lg font-bold p-2 m-3'>Go back</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SettingsMenu;