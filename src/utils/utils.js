export const capitalizeFirstLetter = (str) => {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const formatTemp = (temp, unit) => {
  if (temp && unit === "Celsius") {
    const celsius = Math.round(temp - 273.15) + "°C";
    return celsius
  };

  const fahrenheit = (Math.round((temp - 273.15) * 9/5 + 32)) + "°F";
  return fahrenheit;
};

export const formatWindSpeed = (speed, unit) => {
  if (speed && unit === "km/h") {
    return Math.round(speed * 3.6) + " km/h";
  };

  return speed + " m/s";
};

const getDayOfWeek = (dateString) => {
  const date = new Date(dateString);
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const dayIndex = date.getDay();

  return daysOfWeek[dayIndex];
};

const getTodaysDate = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');

 return `${year}-${month}-${day}`;
};

export const getTodaysForecast = (forecastList, getTemperatureUnit) => {
  const todaysDate = getTodaysDate();

  return forecastList.filter((forecast) => {
    return forecast.dt_txt.split(" ")[0] === todaysDate;
  });
};

const getMaxMinTemp = (forecastList, temperatureUnit) => {
  const maxTemp = Math.max(...forecastList.map((forecast) => forecast.main.temp_max));
  const minTemp = Math.min(...forecastList.map((forecast) => forecast.main.temp_min));

  const formattedMaxTemp = formatTemp(maxTemp, temperatureUnit);
  const formattedMinTemp = formatTemp(minTemp, temperatureUnit);

  return { maxTemp: formattedMaxTemp, minTemp: formattedMinTemp };
}; 

export const getWeeksForecast = (forecastList, temperatureUnit) => {
  const sortedForecast = {};

  for (let index = 0; index < forecastList.length; index++) {
    const forecast = forecastList[index];
    const date = forecast.dt_txt.split(" ")[0];

    if (date === getTodaysDate()) continue;
  
    if (Object.keys(sortedForecast).includes(date)) {
      sortedForecast[date].push(forecast);
    } else {
      sortedForecast[date] = [forecast];
    };
  };

  const weeksForecast = [];

  for (const date in sortedForecast) {
    const { maxTemp, minTemp } = getMaxMinTemp(sortedForecast[date], temperatureUnit);
    const dayOfWeek = getDayOfWeek(date);
    weeksForecast.push({ date, maxTemp, minTemp, dayOfWeek });
  };

  return weeksForecast;
};