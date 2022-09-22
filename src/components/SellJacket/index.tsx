import React from 'react';
import { checkEqualDays } from '../../helpers/checkEqualDays';
import { foreCastResponseType } from '../../types/forecast.response.type';
import { JACKET_PURCHASE_ASSUMPTION } from './constants';

const SellJacket: React.FC<PropsType> = ({ state }) => {
  const [averageDayTemp, setAverageDayTemp] = React.useState<string | string[] | undefined | null>(
    null,
  );
  const [dayTemperature, setDayTemperature] = React.useState<number | number[] | undefined | null>(
    null,
  );

  React.useEffect(() => {
    const getBestSellingJacketDay = () => {
      let result = state?.forecast?.forecastday
        .sort((a, b) => a.day.avgtemp_c - b.day.avgtemp_c)
        .filter((item, index) => item.day.avgtemp_c <= JACKET_PURCHASE_ASSUMPTION);

      checkEqualDays(result, 'avgtemp_c');

      if (checkEqualDays(result, 'avgtemp_c') === true) {
        setAverageDayTemp(result && result[0].date);
        setDayTemperature(result && result[0].day.avgtemp_c);
      } else {
        setAverageDayTemp(result?.map((el) => el.date));
        setDayTemperature(result?.map((el) => el.day.avgtemp_c));
      }
    };

    getBestSellingJacketDay();
  }, [state]);
  return (
    <div className="selling-section">
      {averageDayTemp ? (
        <span data-testid="selling-day-info">
          Best day(s) to buy jacket:<b>{`${averageDayTemp}`}</b>
        </span>
      ) : null}
      {dayTemperature ? (
        <span data-testid="selling-day-info">
          Temperature in &#8451; will be: <b>{`${dayTemperature}`}</b>
        </span>
      ) : null}
    </div>
  );
};

type PropsType = {
  state: foreCastResponseType | null;
};

export default SellJacket;
