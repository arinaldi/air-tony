require('dotenv').load();

const NodeGeocoder = require('node-geocoder');
const request = require('request');

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const BOM_API_KEY = process.env.BOM_API_KEY;

function geocode(location) {

  const options = {
    provider: 'google',
    httpAdapter: 'https',
    apiKey: GOOGLE_API_KEY, 
    formatter: null
  };
   
  let geocoder = NodeGeocoder(options);

  geocoder.geocode(location)
    .then(function(res) {
      //console.log(res);

      var coords = {};
      coords.address = res[0].formattedAddress;
      coords.lat = res[0].latitude;
      coords.lon = res[0].longitude;
      //console.log(coords);

      let breezeResults = breezoMeter(coords);
      console.log(breezeResults);
    })
    .catch(function(err) {
      console.log(err);
      //return err;
    });


}

//1. return the result of geocode

//change to a fetch to convert to a promise
function breezoMeter(coords) {
  let url = `https://api.breezometer.com/baqi/?lat=${coords.lat}&lon=${coords.lon}&key=${BOM_API_KEY}&fields=breezometer_aqi,datetime,breezometer_color,breezometer_description`;

  request(url, function (error, response, body) {
  //console.log('error:', error);
  //console.log('statusCode:', response && response.statusCode);
  console.log(body);
  console.log(coords.address);
  });
}

console.log(geocode('austin, tx'));

//export default Geocode;
