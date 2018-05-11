// Importing npm modules
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

// Importing custom modules
const geocode = require('./geocode/geocode.js');
const weather = require('./weather/weather.js');

// Geocoding the address
geocode.geocodeAddress(yargs.address, (error, geocodeResult) => {
    if (error) {
        console.log(error);
    } else {
        console.log(`Location information`)
        console.log(`--------------------`)
        console.log(`Address: ${geocodeResult.address}`);
        console.log(`Latitude: ${geocodeResult.location.lat}`);
        console.log(`Longitude: ${geocodeResult.location.lng}`);
        console.log('\n');

        // Getting weather for that address
        weather.getWeather(geocodeResult.location, (error, weatherResult) => {
            if (error) {
                console.log(error);
            } else {
                console.log(`Weather information`);
                console.log(`-------------------`);
                console.log(weatherResult);
            }
        });
    }
});