import { foreCastDayType } from '../types/forecast.day.type';

export const checkEqualDays = (
  arr: foreCastDayType[] | undefined | null,
  key: keyof foreCastDayType['day'],
) => {
  return arr?.every((v) => v.day[key] === arr[0].day[key]);
};
