import React, {useState, useEffect} from 'react'
import axios from 'axios'

const WeatherView = ({capital, api_key}) => {
    const [weatherData, setWeatherData] = useState()
    console.log(capital)

    useEffect(() => {
        axios
        .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`)
        .then(response => {
            console.log(response)
            const tempWeather = {
                temperature: response.data.current.temperature,
                icon: response.data.current.weather_icons[0],
                wind: {
                    direction: response.data.current.wind_dir,
                    speed: response.data.current.wind_speed
                }
            }

            setWeatherData(tempWeather)
        })
    }, [capital])

    if (weatherData) {
        return (
            <>
                <h2>Weather in {capital}</h2>
                <p><strong>temperature:</strong> {weatherData.temperature} Celcius</p>
                <img src={weatherData.icon} alt='weather icon' />
                <p><strong>wind:</strong> {weatherData.wind.speed} mph direction {weatherData.wind.direction}</p>
            </>
        )
    }

    return (
        <p>nothing to display yet...</p>
    )
}

export default WeatherView
