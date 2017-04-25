export const RECEIVE_LOCATION = 'RECEIVE_LOCATION';

export function receiveLocation(location, json) {
  //dispatching an action to the store
  return {
    type: 'RECEIVE_LOCATION',
    date: json.datetime,
    name: location,
    aqi: json.breezometer_aqi,
    description: json.breezometer_description
  };
};

export const fetchLocation = location => {
  return dispatch => {
    const BOM_API_KEY = 'fbbb89795db54612ad9598e2ce77b709';
    const URL = `https://api.breezometer.com/baqi/?lat=40.7324296&lon=-73.9977264&key=${BOM_API_KEY}&fields=breezometer_aqi,breezometer_color,breezometer_description,datetime`;
    return fetch(URL)
      .then(response => response.json())
      .then(json => {
        dispatch(receiveLocation(location, json))
      })
      .catch(err => {})
    }
};
