export const REQUEST_LOCATION = 'REQUEST_LOCATION';
export const RECEIVE_LOCATION = 'RECEIVE_LOCATION';
export const SELECT_LOCATION = 'SELECT_LOCATION';
export const INVALIDATE_LOCATION = 'INVALIDATE_LOCATION';

export function addLocation(location, air) {
  return {
    type: 'ADD_LOCATION',
    location,
    air
  }
}

export const selectLocation = location => ({
  type: SELECT_LOCATION,
  location
});

export const invalidateLocation = location => ({
  type: INVALIDATE_LOCATION,
  location
});

export const requestLocation = location => ({
  type: REQUEST_LOCATION,
  location
});

export const receiveLocation = (location, json) => ({
  type: RECEIVE_LOCATION,
  location,
  data: 'test', //json.data.children.map(child => child.data),
  receivedAt: Date.now()
});


const fetchPosts = location => dispatch => {
  dispatch(requestLocation(location))
  return fetch(`https://api.breezometer.com/baqi/?lat=40.7324296&lon=-73.9977264&key=fbbb89795db54612ad9598e2ce77b709&fields=breezometer_aqi,breezometer_color,breezometer_description,datetime`)
    .then(response => response.json())
    .then(json => dispatch(receiveLocation(location, json)))
};

const shouldFetchData = (state, location) => {
  const locations = state.dataByLocation[location]
  if (!locations) {
    return true;
  }
  if (locations.isFetching) {
    return false;
  }
  return locations.didInvalidate;
}


export const fetchDataIfNeeded = location => (dispatch, getState) => {
  if (shouldFetchData(getState(), location)) {
    return dispatch(fetchPosts(location))
  }
}
