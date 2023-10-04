import { FaThermometerEmpty } from 'react-icons/fa';
import { BiWind } from 'react-icons/bi';
import { BsMoisture, BsClouds } from 'react-icons/bs';
import { formatTemp, formatWindSpeed } from '../../utils/utils';
import LoadingPlaceholder from '../../components/LoadingPlaceholder';
import { useSelector } from 'react-redux';
import { getTemperatureUnit, getWindSpeedUnit } from '../settings/settingsSlice';

const AirConditions = ({ weather, status }) => {
  const temperatureUnit = useSelector(getTemperatureUnit);
  const windSpeedUnit = useSelector(getWindSpeedUnit);

  const Content = () => {
    if (!weather.hasOwnProperty("main")) {
      return <LoadingPlaceholder lines={6}/>
    };

    return (
      <div className='flex flex-col w-full justify-center'>
        <div className='flex w-full items-center px-3 h-[80px] justify-between border-2 border-b-gray-400 border-dashed'>
          <div className='flex items-center'>
            <FaThermometerEmpty className='text-[20px] text-gray-500'/>
            <p className='sm:text-[20px] md:text-[20px] lg:text-[15px] xl:text-[20px] text-gray-500 m-0 ml-2'>Feels like</p>
          </div>
          <p className='w-fit sm:text-[20px] md:text-[20px] lg:text-[15px] xl:text-[20px] pr-2 text-gray-500 font-bold'>{formatTemp(weather?.main?.feels_like, temperatureUnit)}</p>
        </div>
        <div className='flex w-full items-center px-3 h-[80px] justify-between border-2 border-b-gray-400 border-dashed'>
          <div className='flex items-center'>
            <BsMoisture className='text-[20px] text-gray-500'/>
            <p className='sm:text-[20px] md:text-[20px] lg:text-[15px] xl:text-[20px] text-gray-500 m-0 ml-2'>Humidity</p>
          </div>
          <p className='w-fit sm:text-[20px] md:text-[20px] lg:text-[15px] xl:text-[20px] text-gray-500 pr-2 font-bold'>{weather?.main?.humidity}%</p>
        </div>
        <div className='flex w-full items-center px-3 h-[80px] justify-between border-2 border-b-gray-400 border-dashed'>
          <div className='flex items-center'>
            <BiWind className='text-[20px] text-gray-500'/>
            <p className='sm:text-[20px] md:text-[20px] lg:text-[15px] xl:text-[20px] text-gray-500 m-0 ml-2'>Wind</p>
          </div>
          <p className='w-fit sm:text-[20px] md:text-[20px] lg:text-[15px] xl:text-[20px] text-gray-500 pr-2 font-bold'>{formatWindSpeed(weather?.wind?.speed, windSpeedUnit)}</p>
        </div>
        <div className='flex w-full items-center px-3 h-[80px] justify-between'>
          <div className='flex items-center'>
            <BsClouds className='text-[20px] text-gray-500'/>
            <p className='sm:text-[20px] md:text-[20px] lg:text-[15px] xl:text-[20px] text-gray-500 m-0 ml-2'>Clouds</p>
          </div>
          <p className='w-fit sm:text-[20px] md:text-[20px] lg:text-[15px] xl:text-[20px] text-gray-500 pr-2 font-bold'>{weather?.clouds?.all}%</p>
        </div>
      </div>
    )
  }
  return (
    <div className={`flex w-full h-[370px] bg-gray-200 rounded-xl flex-col col-span-1 ${status === "loading" && "animate-pulse"}`}>
      <p className='text-[16px] font-semibold text-gray-500 m-0 py-3 px-5 h-fit w-full border-2 border-b-gray-400 rounded-t-xl'>Air Conditions</p>
      <Content/>
    </div>
  );
};

export default AirConditions;