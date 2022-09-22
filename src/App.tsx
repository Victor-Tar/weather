import React from 'react';
import { ChangeEvent } from 'react';
import { foreCastResponseType } from './types/forecast.response.type';
import { fetchWeatherForecast } from './api/forecastApi';
import { Search, SellUmbrella, SellJacket } from './components/';
import './App.css';

export const App: React.FC = () => {
  const [city, setCity] = React.useState<string>('Dublin');
  const [state, setState] = React.useState<foreCastResponseType | null>(null);

  const setNewCity = (e: ChangeEvent<HTMLInputElement>) => setCity(e?.target?.value);

  React.useEffect(() => {
    fetchWeatherForecast(city, setState);
  }, [city]);

  return (
    <div className="main">
      <Search setNewCity={setNewCity} city={city} />
      <SellUmbrella state={state} />
      <SellJacket state={state} />
    </div>
  );
};
