import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import reducer from './reducers'
import AppContainer from './containers/App';

const initialState = {
  locations:
  [
    {
      name: 'Austin, TX, USA',
      date: 'Tue Apr 25 2017 15:07:18 GMT-0500 (CDT)',
      aqi: '89',
      desc: 'great',
      color: 'green'
    },
    {
      name: 'Paris, France',
      date: 'Mon Apr 24 2017 11:09:33 GMT-0500 (CDT)',
      aqi: '67',
      desc: 'Fair',
      color: 'yellow'
    }
  ]
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
