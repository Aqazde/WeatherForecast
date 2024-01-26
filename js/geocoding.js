// Function to perform geocoding based on city name
export async function geocodeCity(cityName) {
    const apiKey = '4a444ce98b768f820d1b3bb1c1c0b525';
    const apiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch geocoding data');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error during geocoding:', error);
        throw error;
    }
}
