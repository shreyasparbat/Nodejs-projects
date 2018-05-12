// Importing npm modules
const axios = require('axios');
const yargs = require('yargs')
    .options({
        address: {
            demand: true,
            describe: 'Address to fetch weather for',
            string: true //tells yargs to always parse the input as a string
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

// Calling Google API
var encodedAddress = encodeURIComponent(yargs.address);
var geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyBBxQlFpQ4eDPKybY4bbDSQbXg8mq5VGbs`;

axios.get(geocodeURL).then((response) => {
    if (response.data.status === 'ZERO_RESULTS') {
        throw new Error('Unable to find address');
    }
    console.log(response.data.results[0].formatted_address);

    // Calling Dark Sky API
    var location = response.data.results[0].location;
    var weatherURL = `https://api.darksky.net/forecast/9095400969d14e9e1cb627c452404788/${location.lat},${location.lng}`;
    return axios.get(weatherURL);

}).then((response) => {
    var temperature = response.data.currently.temperature;
    var apparentTemperature = response.data.currently.apparentTemperature;
    console.log(`It's currently ${temperature} but feels like ${apparentTemperature}`);
}).catch((error) => {
    console.log(error.code);
    if (error.code === "ENOTFOUND") {
        console.log('Unable to connect to API servers')
    }
});