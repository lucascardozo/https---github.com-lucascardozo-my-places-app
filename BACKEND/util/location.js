const axios = require('axios');
const HttpError = require("../models/http-error");

const API_KEY = 'AIzaSyD-DNfMnVsKkIaNqvyH4-rdIJFowgdonr8';

async function getCoordsForAddress(address){
    try {
        const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${API_KEY}`);
        const data = response.data;

        // Log para depuração
        console.log('API Response:', data);

        if (!data || data.status === 'ZERO_RESULTS') {
            const error = new HttpError('Could not find location!', 422);
            throw error;
        }

        if (data.status !== 'OK') {
            const error = new HttpError(`Error from API: ${data.status}`, 500);
            throw error;
        }

        const coordinates = data.results[0]?.geometry?.location;

        if (!coordinates) {
            const error = new HttpError('Could not find location!', 422);
            throw error;
        }

        return coordinates;
    } catch (error) {
        // Log do erro para ajudar na depuração
        console.error('Error fetching coordinates:', error.message);
        throw error;
    }
}

module.exports = getCoordsForAddress;
