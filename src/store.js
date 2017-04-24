import { createStore, compose, applyMiddleware } from 'redux';
//import thunkMiddleware from 'redux-thunk';
//import { createLogger } from 'redux-logger';
import rootReducer from './reducers/index';

const initialState = {
  locations:
  [
    {
      location: 'Austin, TX',
      air: 'Good'
    },
    {
      location: 'Paris, France',
      air: 'Fair'
    }
  ]
};





const enchancers = compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
);

const store = createStore(rootReducer, initialState, enchancers);

if (module.hot) {
  module.hot.accept('./reducers/', () => {
    const nextRootReducer = require('./reducers/index').default;
    store.replaceReducer(nextRootReducer);
  });
}

export default store;


// const loggerMiddleware = createLogger();

// export default function configureStore(preloadedState) {
//   return createStore(
//     rootReducer,
//     //preloadedState,
//     initialState,
//     applyMiddleware(
//       thunkMiddleware,
//       loggerMiddleware
//     )
//   )
// }