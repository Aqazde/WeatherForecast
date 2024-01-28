document.addEventListener('DOMContentLoaded', () => {
    const searchBtn = document.querySelector('.search-btn');
    const cityInput = document.querySelector('.city-input');
    const cityNameElement = document.getElementById('city-name');
    const weatherDescriptionElement = document.getElementById('weather-description');
    const temperatureElement = document.getElementById('temperature');
    const feelsLikeElement = document.getElementById('feels-like');
    const windSpeedElement = document.getElementById('wind-speed');
    const humidityElement = document.getElementById('humidity');
    const pressureElement = document.getElementById('pressure');
    const rainVolumeElement = document.getElementById('rain-volume');
    const iconElement = document.querySelector('.icon img');
    // Initialize the map
    const map = L.map('map').setView([51.505, -0.09], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    // Define a variable to hold the marker
    let marker;
    // Function to display weather data in the console
    function displayWeatherData(data) {
        console.log("Received Weather Data:");
        console.log("City Name:", data.cityName);
        console.log("Country:", data.country);
        console.log("Feels Like:", data.feelsLike);
        console.log("Humidity:", data.humidity);
        console.log("Pressure:", data.pressure);
        console.log("Rain Volume:", data.rainVolume);
        console.log("Temperature:", data.temperature);
        console.log("Wind Speed:", data.windSpeed);
    }
    // Function to add a marker to the map
    function addMarker(lat, lon) {
        if (marker) {
            map.removeLayer(marker); // Remove existing marker if any
        }
        marker = L.marker([lat, lon]).addTo(map);
    }

    searchBtn.addEventListener('click', async () => {
        const cityName = cityInput.value;

        try {
            const response = await fetch('http://localhost:3000/weather', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ cityName }),
            });

            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error(`City not found: ${cityName}`);
                }

                const contentType = response.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || 'Internal Server Error');
                } else {
                    const text = await response.text();
                    throw new Error(`Unexpected response: ${text}`);
                }
            }

            const data = await response.json();
            // Log the received data in the console
            displayWeatherData(data);
            if (data.weather && data.weather.length > 0) {
                // Update the weather description only if weather data is available
                weatherDescriptionElement.innerText = data.description;
            } else {
                weatherDescriptionElement.innerText = "Weather data not available";
            }
            // Update UI with the received weather data
            cityNameElement.innerText = data.cityName;
            weatherDescriptionElement.innerText = data.description;
            temperatureElement.innerText = `${data.temperature}°C`;
            feelsLikeElement.innerText = `${data.feelsLike}°C`;
            windSpeedElement.innerText = `${data.windSpeed} M/S`;
            humidityElement.innerText = `${data.humidity}%`;
            pressureElement.innerText = `${data.pressure} hPa`;
            rainVolumeElement.innerText = `${data.rainVolume} millimeter`;
        } catch (error) {
            console.error(error);
            alert(`Error: ${error.message}`);
        }
    });
    // Map click event
    map.on('click', async function (e) {
        try {
            const response = await fetch('http://localhost:3000/weatherByCoords', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ lat: e.latlng.lat, lon: e.latlng.lng }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log(data); // Log the data
            // Check if weather data is available and has at least one item
            if (data.weather && data.weather.length > 0) {
                weatherDescriptionElement.innerText = data.description;
            } else {
                // If weather data is not available, display a message
                weatherDescriptionElement.innerText = "Weather data not available";
            }
            // Update UI with received weather data
            cityNameElement.innerText = data.cityName;
            weatherDescriptionElement.innerText = data.description;
            temperatureElement.innerText = `${data.temperature}°C`;
            feelsLikeElement.innerText = `${data.feelsLike}°C`;
            windSpeedElement.innerText = `${data.windSpeed} M/S`;
            humidityElement.innerText = `${data.humidity}%`;
            pressureElement.innerText = `${data.pressure} hPa`;
            rainVolumeElement.innerText = `${data.rainVolume} millimeter`;

            // Add a marker to the selected location
            addMarker(e.latlng.lat, e.latlng.lng);
        } catch (error) {
            console.error(error);
            alert(`Error: ${error.message}`);
        }
    });
    const locationBtn = document.getElementById('location-btn');

    locationBtn.addEventListener('click', () => {
        // Check if geolocation is available in the user's browser
        if ('geolocation' in navigator) {
            // Get the user's current position
            navigator.geolocation.getCurrentPosition(async (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;

                try {
                    const response = await fetch('http://localhost:3000/weatherByCoords', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ lat, lon }),
                    });

                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }

                    const data = await response.json();
                    // Update UI with the received weather data
                    cityNameElement.innerText = data.cityName;
                    weatherDescriptionElement.innerText = data.description;
                    temperatureElement.innerText = `${data.temperature}°C`;
                    feelsLikeElement.innerText = `${data.feelsLike}°C`;
                    windSpeedElement.innerText = `${data.windSpeed} M/S`;
                    humidityElement.innerText = `${data.humidity}%`;
                    pressureElement.innerText = `${data.pressure} hPa`;
                    rainVolumeElement.innerText = `${data.rainVolume} millimeter`;
                } catch (error) {
                    console.error(error);
                    alert(`Error: ${error.message}`);
                }
            }, (error) => {
                console.error('Geolocation error:', error);
                alert(`Error: ${error.message}`);
            });
        } else {
            alert('Geolocation is not available in your browser.');
        }
    });

});