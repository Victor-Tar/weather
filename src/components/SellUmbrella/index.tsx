import React from 'react';
import { checkEqualDays } from '../../helpers/checkEqualDays';
import { foreCastResponseType } from '../../types/forecast.response.type';
import { RAIN_PURCHASE_ASSUMPTION } from './constants';

const SellUmbrella: React.FC<PropsType> = ({ state }) => {
  const [minRainDay, setMinRainDay] = React.useState<string | string[] | undefined | null>(null);
  const [rainPercentageChance, setRainPercentageChance] = React.useState<
    number | number[] | undefined | null
  >(null);

  React.useEffect(() => {
    const getBestSellingUmbrellaDay = () => {
      let result = state?.forecast?.forecastday
        .sort((a, b) => b.day.daily_chance_of_rain - a.day.daily_chance_of_rain)
        .filter((item, index) => item.day.daily_chance_of_rain >= RAIN_PURCHASE_ASSUMPTION);

      checkEqualDays(result, 'daily_chance_of_rain');

      if (checkEqualDays(result, 'daily_chance_of_rain') === true) {
        setMinRainDay(result && result[0].date);
        setRainPercentageChance(result && result[0].day.daily_chance_of_rain);
      } else {
        setMinRainDay(result?.map((el) => el.date));
        setRainPercentageChance(result?.map((el) => el.day.daily_chance_of_rain));
      }
    };

    getBestSellingUmbrellaDay();
  }, [state]);

  return (
    <div className="selling-section">
      {minRainDay ? (
        <span data-testid="selling-day-info">
          {' '}
          Best day(s) to buy umbrella:<b>{`${minRainDay}`}</b>
        </span>
      ) : null}

      {rainPercentageChance || rainPercentageChance === 0 ? (
        <span data-testid="selling-day-info">
          {' '}
          Chance of rain in &#37;:<b>{`${rainPercentageChance}`}</b>
        </span>
      ) : null}
    </div>
  );
};

type PropsType = {
  state: foreCastResponseType | null;
};

export default SellUmbrella;
