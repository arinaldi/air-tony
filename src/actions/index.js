import { geocodeGoogle, breezoMeter } from '../api';
import { saveToHistory } from '../utilities';

export const RECEIVE_LOCATION = 'RECEIVE_LOCATION';

export function receiveLocation(newLocation) {
  const { date, name, aqi, description, color } = newLocation;
  return {
    type: 'RECEIVE_LOCATION',
    date,
    name,
    aqi,
    description,
    color,
  };
}

export function fetchLocation(location) {
  let name;

  return dispatch => {

    return geocodeGoogle(location)
      .then(res => {
        name = res.results[0].formatted_address;

        const lat = res.results[0].geometry.location.lat;
        const lng = res.results[0].geometry.location.lng;

        return { lat, lng };
      })
      .then(coords => breezoMeter(coords))
      .then(res => {
        const newLocation = {
          date: res.datetime,
          name,
          aqi: res.breezometer_aqi,
          description: res.breezometer_description,
          color: res.breezometer_color,
        };
        dispatch(receiveLocation(newLocation));

        dispatch(saveToHistory(newLocation));
      })
      .catch(err => {
        //dispatch error state
      })
    }
};
