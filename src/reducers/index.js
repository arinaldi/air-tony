import { combineReducers } from 'redux';
import { RECEIVE_LOCATION, DISPLAY_SUCCESS, DISPLAY_ERROR, SENDING_MESSAGE } from '../constants';

function locations(state = [], action) {
  const { type, date, name, aqi, description, color } = action;
  switch (type) {
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

function message(state = [], action) {
  const { type, message, color } = action;
  switch (type) {
    case DISPLAY_SUCCESS:
    case DISPLAY_ERROR:
    case SENDING_MESSAGE:
      return [message, color];
    default:
      return state;
  }
}

const rootReducer = combineReducers({ locations, message });
export default rootReducer;
