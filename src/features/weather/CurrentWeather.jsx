import { useSelector } from 'react-redux';
import { formatTemp, capitalizeFirstLetter } from '../../utils/utils';
import { Icon } from '../../components/icons';
import { getTemperatureUnit } from '../settings/settingsSlice';

const CurrentWeather = ({ city, weather, status }) => {
  const weatherDescription = weather?.weather?.at(0)?.description;
  const temperature = weather?.main?.temp;
  const weatherIcon = weather?.weather?.at(0)?.icon;

  const temperatureUnit = useSelector(getTemperatureUnit);

  const Content = () => {
    if (!weather.hasOwnProperty("cod")) {
      return (
        <div className="flex min-h-[270x] w-full items-center justify-center">
          <LoadingSpinner/>
        </div>
      );
    };

    return (
      <div className='grid grid-cols-3 w-full min-h-[270px]'>
        <div className='flex w-full flex-col p-2 justify-between col-span-2'>
          <div className='flex w-full py-2 gap-1 h-full flex-col'>
            <p className='text-[40px] font-bold text-white m-0 p-0'>{city}</p>
            <p className='text-[20px] text-white m-0 p-0'>{weatherDescription ? `Current Weather: ${capitalizeFirstLetter(weatherDescription)}` : ""}</p>
          </div>
          <p className='text-[72px] font-bold text-white py-4'>{formatTemp(temperature, temperatureUnit)}</p>
        </div>
        <div className='flex col-span-1 items-center rounded-xl py-2 flex-col h-[280px] justify-center'>
          <Icon name={weatherIcon}/>
        </div>
      </div>
    );
  };

  return (
    <div className={`flex w-full min-h-[300px] items-center justify-center rounded-xl ${status === "loading" && "animate-pulse"}`}>
      <div className='flex gap-2 w-full flex-col min-h-[330px] items-center justify-center'>
        <Content/>
      </div>
    </div>
  );
};

export default CurrentWeather;