import { geocodeGoogle, breezoMeter } from '../api';

export const RECEIVE_LOCATION = 'RECEIVE_LOCATION';

export function receiveLocation(json) {
  //dispatching an action to the store
  return {
    type: 'RECEIVE_LOCATION',
    date: json.date,
    name: json.name,
    aqi: json.aqi,
    desc: json.desc,
    color: json.color
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
        //construct JSON to pass
        const jsonTest = {
          date: res.datetime,
          name: name,
          aqi: res.breezometer_aqi,
          desc: res.breezometer_description,
          color: res.breezometer_color
        };
        dispatch(receiveLocation(jsonTest))
      })
      .catch(err => {
        //dispatch error state
      })
    }
};
