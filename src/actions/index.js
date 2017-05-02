import { geocodeGoogle, breezoMeter } from '../api';
import { saveToHistory } from '../utilities';
import {
  RECEIVE_LOCATION,
  CHANGE_STATUS,
} from '../constants';

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
}

export function changeStatus(text, status) {
  return {
    type: CHANGE_STATUS,
    text,
    status,
  };
}

export function fetchLocation(location) {
  return (dispatch) => {
    dispatch(changeStatus(`Sending request for ${location}...`, ''));

    return geocodeGoogle(location)
      .then((data) => {
        if (data.status === 'OK') {
          return data;
        }
        dispatch(changeStatus('Invalid location', 'error'));
      })
      .then(data => breezoMeter(data))
      .then((data) => {
        if (data[0] === false) {
          dispatch(changeStatus('No data for this location', 'error'));
        } else {
          dispatch(receiveLocation(data[1]));
          dispatch(changeStatus('Request succeeded', 'success'));
          saveToHistory(data[1]);
        }
      })
      .catch((err) => {
        dispatch(changeStatus(err.toString(), 'error'));
      });
  };
}
