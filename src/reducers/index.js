import { combineReducers } from 'redux';

import {
  SELECT_LOCATION, INVALIDATE_LOCATION,
  REQUEST_LOCATION, RECEIVE_LOCATION
} from '../actions';

function locations(state = [], action) {
  switch(action.type) {
    case 'ADD_LOCATION' :
      return [
        {
          location: action.location,
          air: action.air
        },
        ...state
      ];
    default:
      return state;
  }
}

const rootReducer = combineReducers({ locations });

export default rootReducer;

// const selectedLocation = (state = {}, action) => {
//   switch (action.type) {
//     case SELECT_LOCATION:
//       return action.location
//     default:
//       return state
//   }
// }

// const locations = (state = {
//   isFetching: false,
//   didInvalidate: false,
//   items: []
// }, action) => {
//   switch (action.type) {
//     case INVALIDATE_LOCATION:
//       return {
//         ...state,
//         didInvalidate: true
//       };
//     case REQUEST_LOCATION:
//       return {
//         ...state,
//         isFetching: true,
//         didInvalidate: false
//       };
//     case RECEIVE_LOCATION:
//       return {
//         ...state,
//         isFetching: false,
//         didInvalidate: false,
//         items: action.locations,
//         lastUpdated: action.receivedAt
//       };
//     default:
//       return state;
//   }
// }

// const dataByLocation = (state = [], action) => {
//   switch (action.type) {
//     case INVALIDATE_LOCATION:
//     case RECEIVE_LOCATION:
//     case REQUEST_LOCATION:
//       return {
//         ...state,
//         [action.location]: locations(state[action.location], action)
//       };
//     default:
//       return state;
//   }
// }

// const rootReducer = combineReducers({
//   dataByLocation,
//   //selectedLocation
// });

// export default rootReducer;
