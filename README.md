# Weather Dashboard Project

The Weather Dashboard Project is a web application that provides real-time weather information for cities worldwide. Users can check weather details such as temperature, feels-like temperature, wind speed, humidity, pressure, rain volume, and weather description. This project allows users to search for weather information by entering a city name or using their current location.

## Table of Contents
- [Installation](#installation)
- [API Usage](#api-usage)
    - [OpenWeatherMap API](#openweathermap-api)
    - [Geocoding API](#geocoding-api)
    - [Unplash API](#unsplash-api)
    - [Browser's Geoposition](#browsers-geoposition)
    - [OpenStreetMap](#openstreetmap)
- [Key Design Decisions](#key-design-decisions)

## Installation

To run the Weather Dashboard Project locally on your machine, follow these steps:

1. Clone the repository to your local machine.
2. Navigate to the project directory and install the required dependencies.
3. Start the server and access the application in your web browser.

## API Usage

### OpenWeatherMap API

The Weather Dashboard Project uses the OpenWeatherMap API to retrieve weather data for cities. This API provides real-time weather information, including temperature, wind speed, humidity, and more. The project utilizes endpoints for getting weather data by city name.

### Geocoding API

The project also utilizes a Geocoding API to convert user's location input into latitude and longitude coordinates. This enables users to search for weather information by city name or their current location.

### Unsplash API
The Weather Dashboard Project integrates the Unsplash API to display images related to weather conditions and locations. This API allows us to enhance the user experience by providing relevant images that correspond to the current weather or user-selected location.

### Browser's Geoposition

Users can get weather information for their current location using the browser's geolocation feature. This feature allows the application to access the user's device's location and retrieve weather data for that specific location.

### OpenStreetMap

OpenStreetMap is used for rendering maps in the Weather Dashboard Project. It provides map tiles that are displayed in the application to enhance the user interface and provide geographic context.
## Key Design Decisions

- Frontend built with HTML, CSS, JavaScript, and Leaflet.js for maps.
- Backend developed using Node.js and Express.js.
- User-friendly and responsive interface.
- Geolocation support for obtaining weather data based on the user's location.
- Integration with OpenWeatherMap API and Geocoding API for real-time data.