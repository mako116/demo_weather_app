import axios from 'axios';

const BASE_URL = 'https://api.open-meteo.com/v1/forecast';

export const getBerlinWeather = async () => {
  const url = `${BASE_URL}?latitude=52.5244&longitude=13.4105&hourly=temperature_2m,weather_code&forecast_days=1`;

  const response = await axios.get(url);
  return response.data;
};
