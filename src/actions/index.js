import { geocodeGoogle, breezoMeter } from '../api';
import { saveToHistory } from '../utilities';
import {
  SAVE_LOCATION,
  CHANGE_STATUS,
} from '../constants';

export function saveLocation(newLocation) {
  const { date, name, aqi, description, color } = newLocation;
  return {
    type: SAVE_LOCATION,
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
        switch (data.status) {
          case 'OK':
            return data;
          case 'ZERO_RESULTS':
            return Promise.reject({ message: 'Invalid location' });
          case 'REQUEST_DENIED':
            return Promise.reject({ message: data.error_message });
          default:
            return Promise.reject({ message: 'Something went wrong' });
        }
      })
      .then(data => breezoMeter(data))
      .then((data) => {
        if (data.data_valid === false) {
          dispatch(changeStatus(data.error.message, 'error'));
        } else {
          dispatch(saveLocation(data));
          dispatch(changeStatus('Request succeeded', 'success'));
          saveToHistory(data);
        }
      })
      .catch((error) => {
        dispatch(changeStatus(error.message, 'error'));
      });
  };
}
