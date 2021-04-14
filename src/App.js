import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";


//api call api.openweathermap.org/data/2.5/weather?q=London,uk
const API_KEY = "9d84697f11cc1decabee0255bbc224ac";

export default function App() {

  const [query,setQuery] = useState('');
  const [weather,setWeather] = useState({});
  const [error,setError] = useState('');

  const search = evt =>{
    if(evt.key==="Enter"){
      fetch(`http://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&APPID=${API_KEY}`)
      .then(res=>res.json())
      .then(result=>{
        if(result.cod!==undefined && result.main==="undefined"){
            
            setWeather({});
            setError(result.message);
        }
        else{
          
        setError('');
        setWeather(result)
        setQuery('');
        }
      }
      );
    }
  }

  const dateBuilder = (d)=>{
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    return `${day} ${date} ${month} ${year}`


  }

  return (
    <div className={(typeof weather.main!=="undefined")? (weather.main.temp>16?"warm":"app"):"app"}>
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            value={query}
            onChange={(e)=>setQuery(e.target.value)}
            onKeyPress={search}
          />

        </div>{
          (typeof weather.main !== 'undefined') ? (
            <>
             <div className="location-box">
          <div className="location">
               {weather.name}, {weather.sys.country}
          </div>
          <div className="date">
                    {dateBuilder(new Date())}
          </div>
          </div>
          <div className="weather-box">
            <div className="temp">
               {Math.round(weather.main.temp)}&deg;
            </div>
            <div className="weather">
                {weather.weather[0].main}
            </div>
          </div>
            </>
          ):(error?<div className="location">
            {error}
          </div>: null)
        }
       
      </main>
      
    </div>
  )
}




