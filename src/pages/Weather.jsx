import React, { useEffect, useState } from 'react';

function Weather() {

    const [area, setArea] = useState({
        lat: '52.52',
        lon: '13.14'
    })
    async function fetchWeather(url){
        const result = await fetch(url);
        const res = await result.json();
        alert(res.hourly_units.temperature_2m);
        console.log(res.hourly_units.temperature_2m);
        console.log(res);
    }

    useEffect(() => {
        fetchWeather('https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m');
    }, [])

    function handleSubmit(){
        if(area.lat <= 90 && area.lat >= -90 && area.lon <= 180 && area.lon >= -180){
            fetchWeather(`https://api.open-meteo.com/v1/forecast?latitude=${area.lat}&longitude=${area.lon}&hourly=temperature_2m`);
        }else{
            alert('out of range');
        }
    }
    

  return (
    <div>
        <h1>Weather</h1>
        <div>
            Lat: <input type="text" onChange={(e) => setArea({...area, lat: e.target.value})} value={area.lat}/> <br/>
            Lon: <input type="text" onChange={(e) => setArea({...area, lon: e.target.value})} value={area.lon}/> <br/>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    </div>
  )
}

export default Weather