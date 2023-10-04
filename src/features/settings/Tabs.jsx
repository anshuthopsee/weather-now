import { Tab } from '@headlessui/react';
import { useDispatch } from 'react-redux';
import { setTemperatureUnit, setWindSpeedUnit } from './settingsSlice';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
};

const Tabs = ({ type }) => {
  const { title, categories, temperatureUnit, windSpeedUnit } = type;
  const dispatch = useDispatch();

  const handleTabClick = (category) => {
    if (title === 'Temperature') {
      dispatch(setTemperatureUnit(category));
    } else if (title === 'Wind') {
      dispatch(setWindSpeedUnit(category));
    };
  };

  return (
    <>
      <p className='h-[50px] px-6 flex items-center text-gray-500 font-bold text-[18px]'>{title}</p>
      <Tab.Group className='mx-2'>
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
          {categories.map((category) => (
            <Tab
              key={category}
              className={() =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-bold leading-5 text-gray-700 cursor-pointer',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                  temperatureUnit === category || windSpeedUnit === category
                    ? 'bg-[#4834D4] text-white shadow'
                    : 'text-gray-700 hover:bg-white/[0.12] hover:text-gray-900'
                )
              }
              onClick={() => handleTabClick(category)}
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
      </Tab.Group>
    </>
  );
};

export default Tabs;