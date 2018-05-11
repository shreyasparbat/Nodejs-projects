// Importing npm modules
const request = require('request');

var getWeather = (location, callback) => {
    // Sending request to Dark Sky API
    request({
        url: `https://api.darksky.net/forecast/9095400969d14e9e1cb627c452404788/${location.lat},${location.lng}`,
        json: true
    }, (error, response, body) => {
        console.log(response.statusCode);
        if (error) {
            callback('Unable to connect to Dark Sky API server');
        } else if (response.statusCode === 400) {
            callback('Invalid location information was retrived from Google Maps API');
        } else if (response.statusCode === 200) {
            callback(undefined, body.currently);
        }
    });
};

module.exports = {
    getWeather
};