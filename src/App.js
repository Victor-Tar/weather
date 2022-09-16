import { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [city, setCity] = useState('Kyiv');
  const [state, setState] = useState(null);
  const cityRef = useRef('');

  const setNewCity = () => setCity(cityRef.current.value)

  useEffect(() => {
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=439d4b804bc8187953eb36d2a8c26a02`)
      .then(res => res.json())
      .then(res => setState(res.data))
  },[city])

  return (
    <div className="App">
      <div>
        <span>Choose your location</span>
        <input type="text" />
        <button onClick={setNewCity}>Search</button>
      </div>
      <div>{state.name}</div>
      <div>Feels like {state.current.main.feels_like}</div>
      {state.current.main.feels_like === 'Raini' ? <span>Best day to sell an umbrella</span> : null}
      {Math.floor(state.current.main.temp) < 10 && state.current.main.feels_like !== 'Raini' ? <span>Best day to sell a jacket</span> : null}
      <div>Feels like {Math.floor(state.current.main.temp)} C</div>
      <div>Feels like {state.current.weather[0].description}</div>
    </div>
  );
}

export default App;
