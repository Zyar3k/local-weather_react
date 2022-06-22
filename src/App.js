import { useEffect, useState, useRef } from "react";
import { data } from "./helpers/fetch.js";

function App() {
  const [weather, setWeather] = useState({});
  const [homeTown, setHomeTown] = useState("");
  const [error, setError] = useState(false);
  let homeTownRef = useRef("");
  let cityName = useRef();

  const getWeather = async () => {
    if (cityName.current.value !== "") {
      const response = await data(cityName.current.value);
      console.log(response.cod);
      setWeather(response);
      if (response.cod === 200) {
        setError(false);
      } else {
        setError(true);
      }
    } else if (
      homeTown !== homeTownRef.current.value &&
      homeTownRef.current.value !== ""
    ) {
      const response = await data(homeTownRef.current.value);
      console.log(response);
      if (response.cod === 200) {
        setError(false);
      } else {
        setError(true);
      }

      setWeather(response);
    } else {
      const response = await data(homeTown);
      console.log(response);
      setWeather(response);
      if (response.cod === 200) {
        setError(false);
      } else {
        setError(true);
      }
    }
    homeTownRef.current.value = "";
    cityName.current.value = "";
  };

  console.log(weather);

  const addHomeTown = () => {
    localStorage.setItem("homeTown", homeTownRef.current.value);
    getWeather();
  };

  useEffect(() => {
    if (localStorage.getItem("homeTown")) {
      setHomeTown(localStorage.getItem("homeTown"));
    }
    getWeather();
  }, [cityName, homeTown]);
  console.log(weather.name);

  return (
    <>
      <div className="app">
        <main>
          <h1>
            {weather.name} <sup>{weather.sys?.country}</sup>
          </h1>
          <h3>{weather?.main?.temp} °C</h3>
          <p>max {weather.main?.temp_max}</p>
          <p>feels {weather.main?.feels_like}</p>
          <p>min {weather.main?.temp_min}</p>
          <img
            src={`http://openweathermap.org/img/wn/${weather?.weather[0]?.icon}@2x.png`}
            height={100}
          />
          <p>Chmury{weather?.clouds?.all}%</p>
          <p>Wilgotność{weather?.main?.humidity}%</p>
          <p>Wiatr{weather?.wind?.speed}km/h</p>
          <p>Ciśnienie{weather?.main?.pressure} hPa</p>
          <p>
            Wschód: {new Date(weather.sys?.sunrise * 1000).toLocaleTimeString()}
          </p>
          <p>
            Zachód: {new Date(weather.sys?.sunset * 1000).toLocaleTimeString()}
          </p>
          <input type="text" ref={cityName} />
          {error && <h3 style={{ color: "red" }}>Nie znaleziono miasta...</h3>}
          <button onClick={getWeather}>Sprawdź</button>l
        </main>
        <footer>
          <p>Twoje miasto</p>
          <input type="text" ref={homeTownRef} />
          <button onClick={addHomeTown}>Add</button>
        </footer>
      </div>
    </>
  );
}

export default App;
