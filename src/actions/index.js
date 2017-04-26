import { geocodeGoogle, breezoMeter } from "../api";
import { saveToHistory } from "../utilities";

export const RECEIVE_LOCATION = 'RECEIVE_LOCATION';

export function receiveLocation(newLocation) {
  //dispatching an action to the store
  return {
    type: 'RECEIVE_LOCATION',
    date: newLocation.date,
    name: newLocation.name,
    aqi: newLocation.aqi,
    description: newLocation.description,
    color: newLocation.color
  };
};

export const fetchLocation = location => {
  let name;

  return dispatch => {
    //dispatch 'requesting'

    return geocodeGoogle(location)
      .then(res => {
        name = res.results[0].formatted_address;

        const coords = {};
        coords.lat = res.results[0].geometry.location.lat;
        coords.lng = res.results[0].geometry.location.lng;

        return coords;
      })
      .then(coords => breezoMeter(coords))
      .then(res => {
        const newLocation = {
          date: res.datetime,
          name: name,
          aqi: res.breezometer_aqi,
          description: res.breezometer_description,
          color: res.breezometer_color
        };
        dispatch(receiveLocation(newLocation));

        dispatch(saveToHistory(newLocation));
      })
      .catch(err => {
        //dispatch error state
      })
    }
};
