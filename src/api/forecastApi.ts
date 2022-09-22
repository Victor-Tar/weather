import axios from 'axios';
import { foreCastResponseType } from '../types/forecast.response.type';

export const fetchWeatherForecast = async (
  forecastCity: string,
  callback: React.Dispatch<React.SetStateAction<foreCastResponseType | null>>,
) => {
  try {
    const response = await axios.get<foreCastResponseType>(
      `http://api.weatherapi.com/v1/forecast.json?key=c96d2202c5634794b6f112151221609&q=${forecastCity}&days=5&aqi=no&alerts=no`,
    );
    callback(response.data);
  } catch (error) {
    alert('invalid city, please enter an existing one');
  }
};
