export function geocodeGoogle(location) {
  const GOOGLE_API_KEY = 'AIzaSyCs8iHIiSD7O0f15VNk5mmerXBLO-0BKsY';

  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${GOOGLE_API_KEY}`;

  return fetch(url)
    .then(res => res.json())
    .catch(err => {});
}

export function breezoMeter(coords) {
  const BOM_API_KEY = 'fbbb89795db54612ad9598e2ce77b709';

  const url = `https://api.breezometer.com/baqi/?lat=${coords.lat}&lon=${coords.lng}&key=${BOM_API_KEY}&fields=breezometer_aqi,datetime,breezometer_color,breezometer_description`;

  return fetch(url)
    .then(res => res.json())
    .catch(err => {});
}
