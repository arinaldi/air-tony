import { RECEIVE_LOCATION } from '../actions';

function locations(state = [], action) {
  switch(action.type) {
    case RECEIVE_LOCATION:
      return [
        {
          date: action.date,
          name: action.name,
          aqi: action.aqi,
          description: action.description,
          color: action.color
        },
        ...state.slice(0, 4),
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
