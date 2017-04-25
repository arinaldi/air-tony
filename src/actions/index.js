import { geocodeGoogle, breezoMeter } from '../api';

export const RECEIVE_LOCATION = 'RECEIVE_LOCATION';

export function receiveLocation(json) {
  const { date, name, aqi, desc, color } = json;
  return {
    type: 'RECEIVE_LOCATION',
    date,
    name,
    aqi,
    desc,
    color,
  };
};

export const fetchLocation = location => {
  let name;

  return dispatch => {
    // TODO: dispatch 'requesting'

    return geocodeGoogle(location)
      .then(res => {
        name = res.results[0].formatted_address;
        const lat = res.results[0].geometry.location.lat;
        const lng = res.results[0].geometry.location.lng;

        return {lat, lng};
      })
      .then(coords => breezoMeter(coords))
      .then(res => {
        const jsonTest = {
          date: res.datetime,
          name,
          aqi: res.breezometer_aqi,
          desc: res.breezometer_description,
          color: res.breezometer_color
        };
        dispatch(receiveLocation(jsonTest))
      })
      .catch(err => {
        // TODO: dispatch error state
      })
    }
};
