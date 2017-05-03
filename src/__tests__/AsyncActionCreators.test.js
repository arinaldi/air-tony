import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../actions';
import { LocalStorageMock } from '../../localStoragePolyfill';
import {
  GOOGLE_BASE_URL,
  GOOGLE_API_KEY,
  BOM_BASE_URL,
  BOM_API_KEY,
  BOM_OPTIONS,
  SAVE_LOCATION,
  CHANGE_STATUS,
} from '../constants';

const fetchMock = require('fetch-mock');
const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('Async actions', () => {
  it('saves location and changes to success status for a valid location', () => {
    const location = 'austin';
    const name = 'Austin, TX, USA';
    const lat = 30.267153;
    const lng = -97.743061;
    const date = '2017-05-02T19:02:09';
    const aqi = 100;
    const description = 'Fair air quality';
    const color = '#C7E916';

    const googleUrl = `${GOOGLE_BASE_URL}?address=${location}&key=${GOOGLE_API_KEY}`;
    const bomUrl = `${BOM_BASE_URL}?lat=${lat}&lon=${lng}&key=${BOM_API_KEY}${BOM_OPTIONS}`;

    const googleResponse = {
      body: {
        status: 'OK',
        results: [
          {
            formatted_address: name,
            geometry: {
              location: {
                lat,
                lng,
              },
            },
          },
        ],
      },
    };

    const bomResponse = {
      breezometer_aqi: aqi,
      breezometer_color: color,
      breezometer_description: description,
      data_valid: true,
      datetime: date,
    };

    fetchMock.get(googleUrl, googleResponse);
    fetchMock.get(bomUrl, bomResponse);

    const expectedActions = [
      {
        type: CHANGE_STATUS,
        text: 'Sending request for austin...',
        status: '',
      },
      {
        type: SAVE_LOCATION,
        date,
        name,
        aqi,
        description,
        color,
      },
      { type: CHANGE_STATUS,
        text: 'Request succeeded',
        status: 'success',
      },
    ];

    const store = mockStore({
      locations: [],
      message: [],
    });

    return store.dispatch(actions.fetchLocation(location))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      })
      .then(() => fetchMock.restore());
  });

  it('changes to error status for an invalid location', () => {
    const location = '00000';

    const googleUrl = `${GOOGLE_BASE_URL}?address=${location}&key=${GOOGLE_API_KEY}`;

    const googleResponse = {
      body: {
        status: 'ZERO_RESULTS',
        results: [],
      },
    };

    fetchMock.get(googleUrl, googleResponse);

    const expectedActions = [
      {
        type: CHANGE_STATUS,
        text: 'Sending request for 00000...',
        status: '',
      },
      { type: CHANGE_STATUS,
        text: 'Invalid location',
        status: 'error',
      },
    ];

    const store = mockStore({
      locations: [],
      message: [],
    });

    return store.dispatch(actions.fetchLocation(location))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      })
      .then(() => fetchMock.restore());
  });

  it('changes to error status for a location with no data', () => {
    const location = 'iceland';
    const name = 'Iceland';
    const lat = 30.267153;
    const lng = -97.743061;

    const googleUrl = `${GOOGLE_BASE_URL}?address=${location}&key=${GOOGLE_API_KEY}`;
    const bomUrl = `${BOM_BASE_URL}?lat=${lat}&lon=${lng}&key=${BOM_API_KEY}${BOM_OPTIONS}`;

    const googleResponse = {
      body: {
        status: 'OK',
        results: [
          {
            formatted_address: name,
            geometry: {
              location: {
                lat,
                lng,
              },
            },
          },
        ],
      },
    };

    const bomResponse = {
      data_valid: false,
      error: {
        message: 'Provided location is unsupported.',
      },
    };

    fetchMock.get(googleUrl, googleResponse);
    fetchMock.get(bomUrl, bomResponse);

    const expectedActions = [
      {
        type: CHANGE_STATUS,
        text: 'Sending request for iceland...',
        status: '',
      },
      { type: CHANGE_STATUS,
        text: 'Provided location is unsupported.',
        status: 'error',
      },
    ];

    const store = mockStore({
      locations: [],
      message: [],
    });

    return store.dispatch(actions.fetchLocation(location))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      })
      .then(() => fetchMock.restore());
  });

  it('changes to error status for an unrecognized Google response', () => {
    const location = '12345';

    const googleUrl = `${GOOGLE_BASE_URL}?address=${location}&key=${GOOGLE_API_KEY}`;

    const googleResponse = {
      body: {
        status: 'UNKNOWN_ERROR',
        results: [],
      },
    };

    fetchMock.get(googleUrl, googleResponse);

    const expectedActions = [
      {
        type: CHANGE_STATUS,
        text: 'Sending request for 12345...',
        status: '',
      },
      { type: CHANGE_STATUS,
        text: 'Something went wrong',
        status: 'error',
      },
    ];

    const store = mockStore({
      locations: [],
      message: [],
    });

    return store.dispatch(actions.fetchLocation(location))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      })
      .then(() => fetchMock.restore());
  });
});
