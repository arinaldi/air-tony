import { combineReducers } from 'redux';
import {
  RECEIVE_LOCATION,
  CHANGE_STATUS,
} from '../constants';

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
  const { type, text, status } = action;
  switch (type) {
    case CHANGE_STATUS:
      return [text, status];
    default:
      return state;
  }
}

const rootReducer = combineReducers({ locations, message });
export default rootReducer;
