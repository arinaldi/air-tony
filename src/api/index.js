import {
  GOOGLE_BASE_URL,
  GOOGLE_API_KEY,
  BOM_BASE_URL,
  BOM_API_KEY,
  BOM_OPTIONS,
} from '../constants';

export function geocodeGoogle(location) {
  const url = `${GOOGLE_BASE_URL}?address=${location}&key=${GOOGLE_API_KEY}`;

  return fetch(url)
    .then((res) => {
      if (res.ok) return res.json();
      throw new Error('Bad network response');
    })
    .then((json) => {
      const name = json.results[0].formatted_address;
      const lat = json.results[0].geometry.location.lat;
      const lng = json.results[0].geometry.location.lng;

      return {
        status: json.status,
        name,
        lat,
        lng,
      };
    });
}

export function breezoMeter(data) {
  const url = `${BOM_BASE_URL}?lat=${data.lat}&lon=${data.lng}&key=${BOM_API_KEY}${BOM_OPTIONS}`;

  return fetch(url)
    .then((res) => {
      if (res.ok) return res.json();
      throw new Error('Bad network response');
    })
    .then((json) => {
      return [
        json.data_valid,
        {
          date: json.datetime,
          name: data.name,
          aqi: json.breezometer_aqi,
          description: json.breezometer_description,
          color: json.breezometer_color,
        },
      ];
    });
}
