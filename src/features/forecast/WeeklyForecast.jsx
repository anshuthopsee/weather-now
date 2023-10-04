import React from 'react';
import LoadingPlaceholder from '../../components/LoadingPlaceholder';
import { getWeeksForecast } from '../../utils/utils';
import { useSelector } from 'react-redux';
import { getTemperatureUnit } from '../settings/settingsSlice';

const WeeklyForecast = ({ forecast, status }) => {
  const temperatureUnit = useSelector(getTemperatureUnit);

  const Content = () => {
    if (!forecast.hasOwnProperty("cod")) {
      return (
        <>
          <LoadingPlaceholder/>
          <LoadingPlaceholder/>
        </>
      )
    };

    'sm:text-[20px] md:text-[20px] lg:text-[15px] xl:text-[20px] text-gray-500 m-0 ml-2'

    const forecastList = forecast?.list;
    const weeksForecast = getWeeksForecast(forecastList, temperatureUnit);
    return (
      <div className='flex w-full h-full flex-col'>
        {weeksForecast.map((item, i) => {
          return (
            <div className={`flex w-full h-[130px] ${i !== weeksForecast.length-1 ? "border-2" : ""} border-b-gray-400 border-dashed items-center justify-between p-4`} key={i}>
              <p className='sm:text-[20px] md:text-[20px] lg:text-[15px] xl:text-[20px] font-semibold text-gray-500 m-0 p-0'>{item.dayOfWeek}</p>
              <div className='flex gap-2 h-[80px]'>
                <div className='flex flex-col items-center justify-between w-[60px] sm:w-[100px] md:w-[100px] lg:w-[80px] xl:w-[100px] rounded-xl bg-[#4834D4] text-white'>
                  <p className='text-[18px] sm:text-[24px] md:text-[24px] xl:text-[24px] font-bold mt-1 sm:mt-0 p-0'>{item.maxTemp}</p>
                  <p className='text-[14px] p-4'>Max</p>
                </div>
                <div className='flex w-[60px] sm:w-[100px] md:w-[100px] lg:w-[80px] xl:w-[100px] flex-col items-center rounded-xl border-2 border-[#4834D4]'>
                  <p className='text-[18px] sm:text-[24px] md:text-[24px] xl:text-[24px] font-bold text-gray-500 mt-1 sm:mt-0 p-0'>{item.minTemp}</p>
                  <p className='text-[14px] p-4'>Min</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className={`flex w-full h-full bg-gray-200 rounded-xl  flex-col ${status === "loading" && "animate-pulse"}`}>
      <p className='text-[16px] font-semibold text-gray-500 m-0 py-3 px-5 h-fit w-full border-2 border-b-gray-400 rounded-t-xl'>Weekly Forecast</p>
      <Content/>
    </div>
  );
};

export default WeeklyForecast;