import { useSelector } from 'react-redux';
import { getTemperatureUnit } from '../settings/settingsSlice';
import { formatTemp, getTodaysForecast } from '../../utils/utils';
import LoadingPlaceholder from '../../components/LoadingPlaceholder';
import { Icon } from '../../components/icons';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css"

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 1 // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1279, min: 464 },
    items: 2,
    slidesToSlide: 1 // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  }
};

const TodaysForecast = ({ forecast, status }) => {
  const temperatureUnit = useSelector(getTemperatureUnit);
  
  const GridItem = ({ data, last }) => {
    const time = data?.dt_txt?.split(" ")[1];
    const formattedTime = time?.slice(0, -3)
    const temperature = data?.main?.temp;
    const weatherIcon = data?.weather?.at(0)?.icon;

    let marginRight= "mr-2"
    if (last) {
      marginRight = ""
    }

    return (
      <div className={`flex col-span-1 h-[285px] justify-between items-center rounded-xl bg-[#4834D4] flex-col mx-2`}>
        <p className='text-[24px] text-white mt-4 font-bold'>@{formattedTime}</p>
        <Icon name={weatherIcon}/>
        <p className='w-fit text-[24px] font-bold text-white mb-4'>{formatTemp(temperature, temperatureUnit)}</p>
      </div>
    );
  };

  const Content = () => {
    if (!forecast.hasOwnProperty("cod")) {
      return <LoadingPlaceholder/>
    };

    const forecastList = forecast?.list;
    const todaysForecast = getTodaysForecast(forecastList, temperatureUnit);
    const noItems = todaysForecast.length === 0;

    if (noItems) {
      return (
        <div className='flex w-full h-full items-center justify-center'>
          <p className='text-[20px] font-semibold text-gray-500 m-0 py-3 px-5 h-fit w-full text-center'>No forecast available for today</p>
        </div>
      );
    };

    return (
      <Carousel
        containerClass='my-4 mx-4 rounded-xl'
        itemClass=""
        responsive={responsive}
      >
        {todaysForecast.map((item, i) => {
          const first = i === 0;
          const last = i === todaysForecast.length - 1;
          return <GridItem key={i} data={item} first={first} last={last}/>
        })}
      </Carousel>
    );
  }
  return (
    <div className={`flex w-full h-[370px] bg-gray-200 overflow-x-hidden rounded-xl flex-col lg:col-span-2 ${status === "loading" && "animate-pulse"}`}>
      <p className='text-[16px] font-semibold text-gray-500 m-0 py-3 px-5 h-fit w-full border-2 border-b-gray-400 rounded-t-xl'>Today's Forecast</p>
      <Content/>
    </div>
  );
};

export default TodaysForecast;