import { useState, useEffect } from 'react'
import axios from 'axios';
import moment from 'moment/moment';


function App() {

  const api_key = 'f399118b87f04e9c9d1ece5eafd43fc8';
  const [isLoading, setIsLoading] = useState(true);
  var lati = 0;
  var long = 0;
  const [city, setCity] = useState("");
  const [temp, setTemp] = useState("");
  const [wind, setWind] = useState("");
  const [humidity, setHumidity] = useState("");
  const [rain, setRain] = useState("");
  const [desc, setDesc] = useState("");
  const [air, setAir] = useState("");
  const time = moment().format('HH:mm');
  const [sunrise, setSunrise] = useState("");
  const [sunset, setSunset] = useState("");

  function getWeather() {
    axios.get('https://api.weatherbit.io/v2.0/current', {
      params: {
        lat: lati,
        lon: long,
        key: api_key
      }
    })
      .then(function (response) {
        const data = response.data.data[0];
        setCity(data.city_name);
        setTemp(data.temp);
        setWind(Math.round(data.wind_spd * 100) / 100);
        setHumidity(data.rh);
        setRain(data.precip);
        setDesc(data.weather.description);
        setAir(data.aqi);
        setSunrise(data.sunrise);
        setSunset(data.sunset);
        setIsLoading(false);
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((showPosition) => {
        lati = showPosition.coords.latitude;
        long = showPosition.coords.longitude;
        getWeather();
      });
    }
  }

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <div>
      {isLoading ?
        <div className='loading'>
          <h1>Loading</h1>
          <div className="balls">
            <div className='ball ball1'>
            </div>
            <div className='ball ball2'>
            </div>
            <div className='ball ball3'>
            </div>
          </div>
        </div>
        :
        <main>
          <div className="card_background">
            <div className="card">
              <div className="card_local">
                <img className='card_local_pin' src="/pin.svg" />
                <h6 className='card_local_name'>{city}</h6>
              </div>
              <div className="card_temp">
                <h3 className='card_temp_current'>{temp}<span>ºC</span></h3>
                <h6 className='card_temp_desc'>{desc}</h6>
              </div>
              <div className="card_stats">
                <div className="card_stats_card">
                  <img className='card_stats_card_icon' src="/weather.svg" />
                  <div className="text">
                    <p className='card_stats_card_title'>Wind</p>
                    <h6 className='card_stats_card_current'>{wind} <span>km/h</span></h6>
                  </div>
                </div>
                <div className="card_stats_card">
                  <img src="/unidad.svg" className='card_stats_card_icon' />
                  <div className="text">
                    <p className='card_stats_card_title'>Humidity</p>
                    <h6 className='card_stats_card_current'>{humidity} <span>%</span></h6>
                  </div>
                </div>
                <div className="card_stats_card">
                  <img src="/rain.svg" className='card_stats_card_icon' />
                  <div className="text">
                    <p className='card_stats_card_title'>Rain</p>
                    <h6 className='card_stats_card_current'>{rain} <span>%</span></h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="extras">
            <div className="extra_card extra_air">
              <div className="extra_title">
                <img src="/leaf.svg" alt="" />
                <p>Air Quality</p>
              </div>
              <h5 className="air_qual">{air}</h5>
            </div>
            <div className="extra_card ">
              <div className="extra_title">
                <img src="/time.svg" alt="" />
                <p>Sun Time</p>
              </div>
              <div className="sun_graph">
                <div className="graph">
                  <input type="range" className='slider' value={parseInt(time)} min={parseInt(sunrise)} max={parseInt(sunset)} />
                </div>
                <div className="sunrise">{sunrise}</div>
                <div className="sunset">{sunset}</div>
              </div>
            </div>
          </div>
        </main>}
    </div>
  )
}

export default App
