import React from 'react';
import axios from 'axios';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { foreCastResponseType } from '../types/forecast.response.type';
import { fetchWeatherForecast } from './../api/forecastApi';
import { App } from '../App';

jest.mock('axios');

describe('Test App Component', () => {
  let response: {
    data: foreCastResponseType;
  };

  const fetchWeatherForecastCallbackMock = jest.fn();

  beforeEach(() => {
    response = {
      data: {
        location: {
          name: 'Jakarta',
          region: 'Jakarta Raya',
          country: 'Indonesia',
          lat: -6.21,
          lon: 106.85,
          tz_id: 'Asia/Jakarta',
          localtime_epoch: 1663523662,
          localtime: '2022-09-19 0:54',
        },
        forecast: {
          forecastday: [
            {
              date: '2022-09-19',
              date_epoch: 1663545600,
              day: {
                maxtemp_c: 34.6,
                maxtemp_f: 94.3,
                mintemp_c: 26.3,
                mintemp_f: 79.3,
                avgtemp_c: 29.4,
                avgtemp_f: 84.9,
                maxwind_mph: 12.3,
                maxwind_kph: 19.8,
                totalprecip_mm: 4.5,
                totalprecip_in: 0.18,
                avgvis_km: 9.9,
                avgvis_miles: 6.0,
                avghumidity: 62.0,
                daily_will_it_rain: 1,
                daily_chance_of_rain: 88,
                daily_will_it_snow: 0,
                daily_chance_of_snow: 0,
                condition: {
                  text: 'Patchy rain possible',
                  icon: '//cdn.weatherapi.com/weather/64x64/day/176.png',
                  code: 1063,
                },
                uv: 6.0,
              },
            },
            {
              date: '2022-09-20',
              date_epoch: 1663632000,
              day: {
                maxtemp_c: 32.7,
                maxtemp_f: 90.9,
                mintemp_c: 26.1,
                mintemp_f: 79.0,
                avgtemp_c: 28.6,
                avgtemp_f: 83.5,
                maxwind_mph: 11.9,
                maxwind_kph: 19.1,
                totalprecip_mm: 0.9,
                totalprecip_in: 0.04,
                avgvis_km: 9.9,
                avgvis_miles: 6.0,
                avghumidity: 66.0,
                daily_will_it_rain: 1,
                daily_chance_of_rain: 89,
                daily_will_it_snow: 0,
                daily_chance_of_snow: 0,
                condition: {
                  text: 'Patchy rain possible',
                  icon: '//cdn.weatherapi.com/weather/64x64/day/176.png',
                  code: 1063,
                },
                uv: 6.0,
              },
            },
          ],
        },
      },
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test(`Forecast api should be called after component's render`, async () => {
    (axios.get as jest.Mock).mockReturnValue(Promise.resolve(response));
    await fetchWeatherForecast('Jakarta', fetchWeatherForecastCallbackMock);
    expect(axios.get).toBeCalledTimes(1);
  });
  test(`Placeholder's value of an input in the search section should be correct`, async () => {
    render(<App />);
    (axios.get as jest.Mock).mockReturnValue(Promise.resolve(response));
    await fetchWeatherForecast('Jakarta', fetchWeatherForecastCallbackMock);
    expect(screen.getByTestId('search-input').getAttribute('placeholder')).toBe('Jakarta');
  });
  test('Input value in the search section should be correct after onchange', () => {
    render(<App />);
    const input = screen.getByTestId('search-input') as HTMLInputElement;
    userEvent.type(input, 'London');
    expect(input.value).toBe('London');
  });
  test('selling sections should be rendered after successful api request', async () => {
    (axios.get as jest.Mock).mockReturnValue(Promise.resolve(response));
    await fetchWeatherForecast('Jakarta', fetchWeatherForecastCallbackMock);
    render(<App />);
    const sellingSections = await screen.findAllByTestId('selling-day-info');
    expect(sellingSections).not.toBeNull();
    expect(sellingSections.length).toBe(4);
  });
});
