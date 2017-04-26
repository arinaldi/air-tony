import { RECEIVE_LOCATION } from '../actions';

function locations(state = [], action) {
  const { date, name, aqi, description, color } = action;
  switch (action.type) {
    case RECEIVE_LOCATION:
      return [
        {
          date,
          name,
          aqi,
          description,
          color,
        },
        ...state.slice(0, 4),
      ];
    default:
      return state;
  }
}

export default function rootReducer(state = {}, action) {
  return {
    locations: locations(state.locations, action),
  };
}
