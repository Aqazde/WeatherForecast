// weather.js

export async function fetchCurrentWeather(lat, lon) {
    // Implement logic to fetch real-time weather data from your preferred API
    // For example, you can continue using the existing API or switch to OpenWeather for current weather

    // Placeholder for demonstration purposes
    const placeholderData = {
        temperature: 25,
        description: 'Sunny',
        windSpeed: 5,
        humidity: 60,
        pressure: 1013,
        rainVolume: 0,
        // Add other relevant data fields
    };

    return placeholderData;
}

export async function fetchWeatherForecast(lat, lon) {
    // Implement logic to fetch 14-day forecast from OpenWeather API
    // Use the provided API key for authentication

    const apiKey = 'API Key';
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&cnt=14&appid=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Unable to fetch weather forecast');
        }

        const data = await response.json();
        // Extract and return the relevant forecast data
        const forecastData = extractForecastData(data);
        return forecastData;
    } catch (error) {
        console.error('Error during weather forecast fetching:', error);
        throw error;
    }
}

// Helper function to extract relevant forecast data
function extractForecastData(data) {
    return data.list.map(day => ({
        temperature: day.temp.day,
        feelsLike: day.feels_like.day,
        windSpeed: day.speed,
        humidity: day.humidity,
        pressure: day.pressure,
        rainVolume: day.rain ? day.rain : 0,
        // Add other relevant data fields
    }));
}
