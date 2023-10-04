import React from 'react';
import { useSelector } from 'react-redux';
import Search from '../features/search/Search';
import CurrentWeather from '../features/weather/CurrentWeather';
import { getCity, getWeather, getWeatherStatus } from '../features/weather/weatherSlice';
import { getForecast, getForecastStatus } from '../features/forecast/forecastSlice';
import AirConditions from '../features/weather/AirConditions';
import TodaysForecast from '../features/forecast/TodaysForecast';
import WeeklyForecast from '../features/forecast/WeeklyForecast';
import { BiSearchAlt } from 'react-icons/bi';

const Wrapper = () => {
  const city = useSelector(getCity);
  const weather = useSelector(getWeather);
  const weatherStatus = useSelector(getWeatherStatus);
  const forecast = useSelector(getForecast);
  const forecastStatus = useSelector(getForecastStatus);
  const isLoading = weatherStatus === "loading" || forecastStatus === "loading";

  const Content = () => {
    if (!weather.hasOwnProperty("cod") || !forecast.hasOwnProperty("cod")) {
      return (
        <div className={`flex w-full min-h-[400px] justify-center items-center flex-col ${isLoading ? "animate-pulse" : ""}`}>
          <BiSearchAlt className='text-[200px] text-white'/>
          <p className='text-white font-mono text-center'>Search for a city, to get it's current and forecasted weather!</p>
        </div>
      );
    };

    return (
      <div className='grid grid-cols-3 gap-3 rounded-xl'>
        <div className='flex flex-col mt-2 relative rounded-xl h-auto lg:col-span-2 sm:col-span-3 col-span-3'>
          <CurrentWeather city={city} weather={weather} status={weatherStatus}/>
          <div className='flex grow rounded-xl w-full'>
            <div className='grid h-full lg:grid-cols-3 gap-3 w-full xs:grid-rows-2'>
              <AirConditions weather={weather} status={weatherStatus}/>
              <TodaysForecast forecast={forecast} status={forecastStatus}/>
            </div>
          </div>
        </div>
        <div className='flex min-h-[700px] rounded-xl mt-0 lg:mt-2 lg:col-span-1 sm:col-span-3 col-span-3'>
          <WeeklyForecast forecast={forecast} status={forecastStatus}/>
        </div>
      </div>
    );
  };

  return (
    <>
      <Search />
      <Content/>
    </>
  );
};

export default Wrapper;