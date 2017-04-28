import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import reducer from './reducers'
import AppContainer from './containers/App';
import { localStorageTest, getHistory } from './utilities';

let currentHistory;

if (localStorageTest()) {
  currentHistory = getHistory();
} else {
  console.error('Local Storage not available');
}

const initialState = {
  locations: currentHistory,
  message: ['Enter a location', ''],
};

const middleware = [ thunk ]
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger())
};

const store = createStore(
  reducer,
  initialState,
  applyMiddleware(...middleware)
);

render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById('root')
)
