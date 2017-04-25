import { RECEIVE_LOCATION } from '../actions';

function locations(state = [], action) {
  const { date, name, aqi, desc, color } = action;
  switch(action.type) {
    case RECEIVE_LOCATION:
      return [
        {
          date,
          name,
          aqi,
          desc,
          color
        },
        ...state
      ];
    default:
      return state;
  }
}

export default function rootReducer(state = {}, action) {
  return {
    locations: locations(state.locations, action)
  }
}
