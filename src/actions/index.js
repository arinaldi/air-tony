import { geocodeGoogle, breezoMeter } from "../api";
import { saveToHistory } from "../utilities";
import { RECEIVE_LOCATION, DISPLAY_SUCCESS, DISPLAY_ERROR, SENDING_MESSAGE } from '../constants';

export function receiveLocation(newLocation) {
  const { date, name, aqi, description, color } = newLocation;
  return {
    type: RECEIVE_LOCATION,
    date,
    name,
    aqi,
    description,
    color,
  };
};

export function displaySuccess() {
  return {
    type: DISPLAY_SUCCESS,
    message: 'Request succeeded',
    color: 'green',
  };
}

export function displayError(message) {
  return {
    type: DISPLAY_ERROR,
    message,
    color: 'red',
  };
}

export function sendMessage() {
  return {
    type: SENDING_MESSAGE,
    message: 'Sending request...',
    color: 'black',
  };
}

export const fetchLocation = location => {
  let name;

  return dispatch => {
    dispatch(sendMessage());

    return geocodeGoogle(location)
      .then(res => {
        if (res.status === 'OK') {
          name = res.results[0].formatted_address;

          const lat = res.results[0].geometry.location.lat;
          const lng = res.results[0].geometry.location.lng;

          return { lat, lng };
        } else {
          dispatch(displayError('Invalid location'));
        }
      })
      .then(coords => breezoMeter(coords))
      .then(res => {
        if (res.data_valid) {
          const newLocation = {
            date: res.datetime,
            name: name,
            aqi: res.breezometer_aqi,
            description: res.breezometer_description,
            color: res.breezometer_color
          };
          dispatch(receiveLocation(newLocation));
          dispatch(displaySuccess());
          saveToHistory(newLocation);
        } else if (res.data_valid === false) {
          dispatch(displayError('No data for this location'));
        }
      })
      .catch(err => {
        dispatch(displayError(err.toString()));
      });
    }
};
