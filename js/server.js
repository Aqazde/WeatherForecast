const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.use(express.static('public'));

app.get('/weather', async (req, res) => {
    const { lat, lon } = req.query;

    try {
        // Fetch current weather data
        const currentWeatherData = await fetchCurrentWeather(lat, lon);

        // Fetch 14-day forecast data
        const forecastData = await fetchWeatherForecast(lat, lon);

        // Send the combined weather data back to the client
        res.json({ currentWeatherData, forecastData });
    } catch (error) {
        console.error('Error during weather data fetching:', error);
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Function to fetch current weather data
async function fetchCurrentWeather(lat, lon) {
    // Replace 'your_openweather_api_key' with your actual OpenWeather API key
    const apiKey = '1660304cf8f18234262dfa8dbcbf9671';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Unable to fetch current weather data');
        }

        const data = await response.json();
        // Extract and return the relevant current weather data
        const currentWeatherData = extractCurrentWeatherData(data);
        return currentWeatherData;
    } catch (error) {
        console.error('Error during current weather data fetching:', error);
        throw error;
    }
}

// Function to fetch 14-day weather forecast data
async function fetchWeatherForecast(lat, lon) {
    const apiKey = '1660304cf8f18234262dfa8dbcbf9671';
    const apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&appid=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Unable to fetch weather forecast data');
        }

        const data = await response.json();
        // Extract and return the relevant forecast data
        const forecastData = extractForecastData(data.daily);
        return forecastData;
    } catch (error) {
        console.error('Error during weather forecast data fetching:', error);
        throw error;
    }
}

// Helper function to extract relevant current weather data
function extractCurrentWeatherData(data) {
    return {
        temperature: data.main.temp,
        description: data.weather[0].description,
        windSpeed: data.wind.speed,
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        rainVolume: data.rain ? data.rain['1h'] : 0,
        // Add other relevant data fields
    };
}

// Helper function to extract relevant forecast data
function extractForecastData(dailyData) {
    return dailyData.map(day => ({
        temperature: day.temp.day,
        feelsLike: day.feels_like.day,
        windSpeed: day.wind_speed,
        humidity: day.humidity,
        pressure: day.pressure,
        rainVolume: day.rain ? day.rain : 0,
        // Add other relevant data fields
    }));
}
