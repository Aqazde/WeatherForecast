const express = require('express');
const axios = require('axios');
const path = require('path');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.static('public'));
app.use(express.json());

const apiKey = '94d6830355718e066e529ae0bf15b899';

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Endpoint to get weather by city name
app.post('/weather', async (req, res) => {
    const cityName = req.body.cityName;
    try {
        const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`);
        res.json(formatWeatherData(weatherResponse.data));
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: error.message });
    }
});

// New endpoint to get weather by coordinates (latitude and longitude)
app.post('/weatherByCoords', async (req, res) => {
    const { lat, lon } = req.body;
    try {
        const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`);
        res.json(formatWeatherData(weatherResponse.data));
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: error.message });
    }
});

// Function to format the weather data
function formatWeatherData(data) {
    return {
        cityName: data.name,
        description: data.weather[0].main,
        temperature: data.main.temp,
        feelsLike: data.main.feels_like,
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        windSpeed: data.wind.speed,
        country: data.sys.country,
        rainVolume: data.rain ? data.rain['1h'] : 0
    };
}

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
