import { useRef, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getResults, fetchSearchResults, getInputedText, setInputedText, clearResults, getSearchStatus, getMemoizedResults, setResults, controller } from './searchSlice';
import { fetchWeather } from '../weather/weatherSlice';
import { fetchForecast } from '../forecast/forecastSlice';
import { Combobox, Transition } from '@headlessui/react';
import LoadingAndErrorMessage from './LoadingAndErrorMessage';
import { BiSearchAlt } from 'react-icons/bi';

const Search = () => {
  const fetchTimerRef = useRef(null);
  const memoizedTimerRef = useRef(null);
  const inputedText = useSelector(getInputedText);
  const results = useSelector(getResults);
  const searchStatus = useSelector(getSearchStatus);
  const memoizedResults = useSelector(getMemoizedResults);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const text = e.target.value;
    const formattedtext = text.replace(/\s+/g, " ").split(",")[0];

    clearTimeout(fetchTimerRef.current);
    clearTimeout(memoizedTimerRef.current);

    if (text.length === 0) {
      dispatch(setInputedText({ text, loading: true}));
      dispatch(clearResults());
    } else if (Object.keys(memoizedResults).includes(formattedtext)) {
      dispatch(setInputedText({ text, loading: false}));
      memoizedTimerRef.current = setTimeout(() => {
        dispatch(setResults(memoizedResults[formattedtext]));
      }, 100);
    } else {
      if (controller) {
        controller.abort();
      };
      dispatch(setInputedText({ text, loading: true}));
      fetchTimerRef.current = setTimeout(() => {
      dispatch(fetchSearchResults(formattedtext));
      }, 600);
    };
  };

  const handleComboxChange = (value) => {
    const { city, countryCode, latitude, longitude } = value;

    dispatch(setInputedText({
      text: `${city}, ${countryCode}`, 
      loading: false 
    }));
    dispatch(fetchWeather({
      city: `${city}, ${countryCode}`,
      lat: latitude,
      lon: longitude
    }));
    dispatch(fetchForecast({
      city: `${city}, ${countryCode}`,
      lat: latitude,
      lon: longitude
    }))
  };

  const handleAfterLeave = () => {
    dispatch(clearResults());
  };

  return (
    <div className='w-full h-[38px] mb-1 relative z-10'>
       <div className='w-full absolute'>
        <Combobox value={inputedText} by={"id"} onChange={handleComboxChange}>
          <div className='relative'>
            <Combobox.Input displayValue={inputedText} 
              placeholder='Search places...' 
              onChange={handleChange} className="w-full border bg-gray-200 focus:border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 placeholder-gray-600 focus:ring-0 focus:outline-[#5260fa] rounded-xl"
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <BiSearchAlt className="h-5 w-5 text-gray-700" aria-hidden="true" />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={handleAfterLeave}
          >
          <Combobox.Options className="bg-gray-200 text-gray-700 mt-2 rounded-xl shadow-2xl" hold>
            <LoadingAndErrorMessage/>
            {results.map((result, i) => {
              if (searchStatus === "loading") return;
              return (
                <Combobox.Option 
                  key={i} 
                  value={result}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 px-3 ${i == 0 ? 
                      "rounded-t-xl" : ""} ${i === results.length - 1 ? "rounded-b-xl" : ""} ${
                      active ? 'bg-[#5260fa] text-white' : 'text-gray-900'
                    }`
                  }
                >
                  {`${result.city}, ${result.countryCode}`}
                </Combobox.Option>
              )
            })}
          </Combobox.Options>
          </Transition>
        </Combobox>
      </div>
    </div>
  );
};

export default Search;