import reducer from '../reducers';
import * as actions from '../actions';
import {
  SAVE_LOCATION,
  CHANGE_STATUS,
} from '../constants';

const locations = [
  {
    date: 'May 2',
    name: 'Richmond',
    aqi: 99,
    description: 'Great air quality',
    color: 'green',
  },
  {
    date: 'May 3',
    name: 'Austin',
    aqi: 66,
    description: 'Moderate air quality',
    color: 'yellow',
  },
];

describe('reducers', () => {
  it('returns the initial state', () => {
    expect(
      reducer(undefined, {})).toEqual({
        locations: [],
        message: [],
      },
    );
  });

  it('handles SAVE_LOCATION', () => {
    expect(
      reducer({}, {
        type: SAVE_LOCATION,
        ...locations[0],
      }),
      ).toEqual({
        locations: [{
          ...locations[0],
        }],
        message: [],
      },
    );
    expect(
      reducer({
        locations: [{
          ...locations[0],
        }],
        message: [],
      }, {
        type: SAVE_LOCATION,
        ...locations[1],
      }),
      ).toEqual({
        locations: [{
          ...locations[1],
        },
        {
          ...locations[0],
        }],
        message: [],
      },
    );
  });

  it('handles CHANGE_STATUS', () => {
    const text = 'Request succeeded';
    const status = 'success';

    expect(
      reducer({}, {
        type: CHANGE_STATUS,
        text,
        status,
      }),
      ).toEqual({
        locations: [],
        message: [text, status],
      });
  });
});
