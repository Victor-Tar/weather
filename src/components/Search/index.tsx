import React from 'react';
import { ChangeEvent } from 'react';
import debounce from 'lodash.debounce';

const Search: React.FC<PropsType> = ({ city, setNewCity }) => {
  return (
    <div className="search-section">
      <label>Choose your location:</label>
      <input
        data-testid="search-input"
        type="text"
        onChange={debounce(setNewCity, 1000)}
        placeholder={city}
      />
    </div>
  );
};

type PropsType = {
  city: string;
  setNewCity: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default Search;
