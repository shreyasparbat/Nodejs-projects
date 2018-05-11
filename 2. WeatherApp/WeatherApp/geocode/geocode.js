// Importing npm modules
const request = require('request');

var geocodeAddress = (address) => {
    // Encoding
    var encodedAddress = encodeURIComponent(address);

    return new Promise((resolve, reject) => {
        // Sending a request to Google Maps API
        request({
            url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyBBxQlFpQ4eDPKybY4bbDSQbXg8mq5VGbs`,
            json: true //tells request to parse the data before hand 
        }, (error, response, body) => { //note: body = response.body
            // Check for errors in sending request
            if (error) {
                reject('Unable to connect to Google API server');
            } else if (body.status === "ZERO_RESULTS") {
                reject('Unable to find the address');
            } else if (body.status === "OK") {
                resolve({
                    address: body.results[0].formatted_address,
                    location: body.results[0].geometry.location
                });
            }
        });
    });
}

module.exports = {
    geocodeAddress
};