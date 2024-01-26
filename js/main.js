import { geocodeCity } from './geocoding';

document.addEventListener('DOMContentLoaded', () => {
    const searchBtn = document.querySelector('.search-btn');
    const cityInput = document.querySelector('.city-input');

    searchBtn.addEventListener('click', async () => {
        const cityName = cityInput.value.trim();

        if (cityName !== '') {
            try {
                // Perform geocoding to get the coordinates of the city
                const geocodingData = await geocodeCity(cityName);
                const { lat, lon } = geocodingData[0]; // Assuming we use the first result

                // Fetch data from your server
                const serverResponse = await fetchDataFromServer(lat, lon);
                console.log('Server Response:', serverResponse);

                // Update the UI with server data
                updateWeatherUI(serverResponse);
            } catch (error) {
                console.error('Error during geocoding or server request:', error);
                // Handle the error or display an error message to the user
            }
        }
    });
});

// Function to fetch data from your server
async function fetchDataFromServer(lat, lon) {
    try {
        const response = await fetch(`/weather?lat=${lat}&lon=${lon}`);
        if (!response.ok) {
            throw new Error('Failed to fetch data from the server');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error during server request:', error);
        throw error;
    }
}

// Function to update the UI with weather data
function updateWeatherUI(data) {
    // Update current weather data
    const currentWeather = data.currentWeatherData;
    document.getElementById('city-name').textContent = currentWeather.cityName; // Assuming your server sends the city name
    document.getElementById('weather-description').textContent = currentWeather.description;
    document.getElementById('temperature').textContent = `${currentWeather.temperature}°C`;
    document.getElementById('feels-like').textContent = `${currentWeather.feelsLike}°C`;
    document.getElementById('wind-speed').textContent = `${currentWeather.windSpeed} M/S`;
    document.getElementById('humidity').textContent = `${currentWeather.humidity}%`;
    document.getElementById('pressure').textContent = `${currentWeather.pressure} hPa`;
    document.getElementById('rain-volume').textContent = `${currentWeather.rainVolume}%`;

    // Update forecast data
    const forecast = data.forecastData;
    const forecastCards = document.querySelector('.weather-cards');
    forecastCards.innerHTML = ''; // Clear existing cards

    forecast.forEach(day => {
        const card = document.createElement('li');
        card.innerHTML = `
            <h4>${day.date}</h4>
            <p>Temperature: ${day.temperature}°C</p>
            <p>Feels Like: ${day.feelsLike}°C</p>
            <p>Wind Speed: ${day.windSpeed} M/S</p>
            <p>Humidity: ${day.humidity}%</p>
            <p>Pressure: ${day.pressure} hPa</p>
            <p>Rain Volume: ${day.rainVolume}%</p>
        `;
        forecastCards.appendChild(card);
    });
}