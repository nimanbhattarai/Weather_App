import React from 'react'
import { useEffect, useState, useRef } from 'react'
import './Weather.css'
import search_icon from '../assets/search.png'
import cloudy_icon from '../assets/cloudy.png'
import cloudy_night_icon from '../assets/cloudy_night.png'
import drizzle_icon from '../assets/drizzle.png'
import drizzle__night_icon from '../assets/drizzle_night.png'
import humidity_icon from '../assets/humidity.png'
import rain_icon from '../assets/rain.png'
import rain_night_icon from '../assets/rain_night.png'
import snow_icon from '../assets/snow.png'
import snow_night_icon from '../assets/snow_night.png'
import sunny_icon from '../assets/sunny.png'
import moon_icon from '../assets/moon.png'
import wind_icon from '../assets/wind.png'

const Weather = () => {

    const inputRef = useRef()
    const [weatherData, setWeatherData] = useState(null)  // Set initial state to null for conditional rendering

    const allIcons = {
        "01d": sunny_icon,
        "01n": moon_icon,
        "02d": cloudy_icon,
        "02n": cloudy_night_icon,
        "03d": cloudy_icon,
        "03n": cloudy_night_icon,
        "04d": cloudy_icon,
        "04n": cloudy_night_icon,
        "09d": drizzle_icon,
        "09n": drizzle__night_icon,
        "10d": rain_icon,
        "10n": rain_night_icon,
        "11d": rain_icon,
        "11n": rain_night_icon,
        "13d": snow_icon,
        "13n": snow_night_icon,
    }

    const search = async (city) => {

        if (!city) {
            alert("Please enter a city name")
            return
        }
        
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Failed to fetch weather data")
            }
            const data = await response.json()
            console.log(data)

            const icon = allIcons[data.weather[0].icon]
            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon
            })
        } catch (error) {
            setWeatherData(false)
            console.error("Error fetching the weather data:", error)
            
        }
    }

    useEffect(() => {
        search("Kathmandu")
    }, [])

    return (
        <div className='weather'>
            <div className="search-bar">
                <input ref={inputRef} type="text" placeholder='Search' />
                <img src={search_icon} alt="Search" onClick={() => search(inputRef.current.value)} />
            </div>
            {weatherData ? (
                <>
                    <img src={weatherData.icon} alt="Weather Icon" className='weather-icon' />
                    <p className='temperature'>{weatherData.temperature}°C</p>
                    <p className='location'>{weatherData.location}</p>
                    <div className="weather-data">
                        <div className="col">
                            <img src={humidity_icon} alt="Humidity Icon" />
                            <div>
                                <p>{weatherData.humidity} %</p>
                                <span>Humidity</span>
                            </div>
                        </div>
                        <div className="col">
                            <img src={wind_icon} alt="Wind Icon" />
                            <div>
                                <p>{weatherData.windSpeed} Km/h</p>
                                <span>Wind Speed</span>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <p>Loading weather data...</p>
            )}
        </div>
    )
}

export default Weather
