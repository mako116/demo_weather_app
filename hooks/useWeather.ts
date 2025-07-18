import { useEffect, useState } from 'react';
import axios from 'axios';

interface WeatherResponse {
  hourly: {
    temperature_2m: number[];
    weather_code: number[];
  };
  utc_offset_seconds: number;
}

// hooks/useWeather.ts

export const useWeather = () => {
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchWeather = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get<WeatherResponse>(
        'https://api.open-meteo.com/v1/forecast?latitude=52.5244&longitude=13.4105&hourly=temperature_2m,weather_code&forecast_days=1'
      );
      setWeather(data);
    } catch (error) {
      console.error('Weather fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
    const interval = setInterval(fetchWeather, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return { weather, loading, fetchWeather }; // ✅ include fetchWeather
};


