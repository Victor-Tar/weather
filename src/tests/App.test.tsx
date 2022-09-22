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
          name: 'Dublin',
          region: 'Dublin',
          country: 'Ireland',
          lat: 53.33,
          lon: -6.25,
          tz_id: 'Europe/Dublin',
          localtime_epoch: 1663849252,
          localtime: '2022-09-22 13:20',
        },
        forecast: {
          forecastday: [
            {
              date: '2022-09-22',
              date_epoch: 1663804800,
              day: {
                maxtemp_c: 15.1,
                maxtemp_f: 59.2,
                mintemp_c: 10.1,
                mintemp_f: 50.2,
                avgtemp_c: 13.7,
                avgtemp_f: 56.7,
                maxwind_mph: 11.4,
                maxwind_kph: 18.4,
                totalprecip_mm: 21.5,
                totalprecip_in: 0.85,
                avgvis_km: 9.0,
                avgvis_miles: 5.0,
                avghumidity: 90.0,
                daily_will_it_rain: 1,
                daily_chance_of_rain: 98,
                daily_will_it_snow: 0,
                daily_chance_of_snow: 0,
                condition: {
                  text: 'Heavy rain',
                  icon: '//cdn.weatherapi.com/weather/64x64/day/308.png',
                  code: 1195,
                },
                uv: 3.0,
              },
            },
            {
              date: '2022-09-23',
              date_epoch: 1663891200,
              day: {
                maxtemp_c: 14.9,
                maxtemp_f: 58.8,
                mintemp_c: 7.2,
                mintemp_f: 45.0,
                avgtemp_c: 10.7,
                avgtemp_f: 51.2,
                maxwind_mph: 10.3,
                maxwind_kph: 16.6,
                totalprecip_mm: 1.5,
                totalprecip_in: 0.06,
                avgvis_km: 8.3,
                avgvis_miles: 5.0,
                avghumidity: 84.0,
                daily_will_it_rain: 1,
                daily_chance_of_rain: 87,
                daily_will_it_snow: 0,
                daily_chance_of_snow: 0,
                condition: {
                  text: 'Patchy rain possible',
                  icon: '//cdn.weatherapi.com/weather/64x64/day/176.png',
                  code: 1063,
                },
                uv: 3.0,
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
    await fetchWeatherForecast('Dublin', fetchWeatherForecastCallbackMock);
    expect(axios.get).toBeCalledTimes(1);
  });
  test(`Placeholder's value of an input in the search section should be correct`, async () => {
    render(<App />);
    (axios.get as jest.Mock).mockReturnValue(Promise.resolve(response));
    await fetchWeatherForecast('Dublin', fetchWeatherForecastCallbackMock);
    expect(screen.getByTestId('search-input').getAttribute('placeholder')).toBe('Dublin');
  });
  test('Input value in the search section should be correct after onchange', () => {
    render(<App />);
    const input = screen.getByTestId('search-input') as HTMLInputElement;
    userEvent.type(input, 'London');
    expect(input.value).toBe('London');
  });
  test('selling sections should be rendered after successful api request', async () => {
    (axios.get as jest.Mock).mockReturnValue(Promise.resolve(response));
    await fetchWeatherForecast('Dublin', fetchWeatherForecastCallbackMock);
    render(<App />);
    const sellingSections = await screen.findAllByTestId('selling-day-info');
    expect(sellingSections).not.toBeNull();
    expect(sellingSections.length).toBe(4);
  });
});
