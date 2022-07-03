import { useEffect, useState } from 'react'
import axios from 'axios';
import bgImg from './FoldesImage/bgImg.jpg';
import './App.css'


function App() {
  const [data, setData] = useState({});
  const [isClick, setIsClick] = useState(true);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=2a3f9eb6bc57c88467e9dad971d11a58`)
        .then((res) => setData(res.data));
    }, (error) => {
      console.error(error);
      console.log("Ha ocurrido un error");
  });

  }, []);
  console.log(data);

  const converterButton = () => {
    setIsClick(!isClick);
  }

  return (
    <>
    <img className='bg__image' src={bgImg} alt="image background climate" />
    <div className="card__climate">
      <div className="info__title">
        <h1>Weather App</h1>
        <h4>{data.name} {data.sys?.country}</h4>
      </div>
      <div className='image__climate'>
        <img src={`http://openweathermap.org/img/wn/${data?.weather?.[0].icon}@2x.png`} alt="icon climate" />
      </div>
      <div className="info__climate">
        <h4>"{data.weather?.[0].description}"</h4>
        <p><i className="fa-solid fa-wind"></i> <b>Wind speed:</b> {data.wind?.speed} m/s</p>
        <p><i className="fas fa-cloud"></i> <b> Humidity:</b> {data.main?.humidity}%</p>
        <p><i className="fa-solid fa-temperature-half"></i> <b>Pressure:</b> {data.main?.pressure}mb</p>
      </div>
      <div className="info__climate-button">
        <span> <b> {isClick ? (`${(data.main?.temp - 273).toFixed(2)} °C`) : (`${((data.main?.temp - 273.15) * 9 / 5 + 32).toFixed(2)} °F`)}</b> </span>
        <button onClick={converterButton}>Degrees °C/ºF</button>
      </div>
    </div>
    </>
    
  )
}

export default App
