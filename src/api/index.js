import { GOOGLE_API_KEY, BOM_API_KEY } from '../constants';

export function geocodeGoogle(location) {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${GOOGLE_API_KEY}`;

  return fetch(url)
    .then(res => {
      if (res.ok) return res.json();
      throw new Error('Bad network response');
    });
}

export function breezoMeter(coords) {
  const url = `https://api.breezometer.com/baqi/?lat=${coords.lat}&lon=${coords.lng}&key=${BOM_API_KEY}&fields=breezometer_aqi,datetime,breezometer_color,breezometer_description,data_valid`;

  return fetch(url)
    .then(res => {
      if (res.ok) return res.json();
      throw new Error('Bad network response');
    });
}
