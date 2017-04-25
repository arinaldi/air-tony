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
      date: '1/1/17',
      aqi: '89',
      desc: 'great'
    },
    {
      name: 'Paris, France',
      date: '12/21/00',
      aqi: '67',
      desc: 'Fair'
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
