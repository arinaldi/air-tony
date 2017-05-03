import * as actions from '../actions';
import {
  SAVE_LOCATION,
  CHANGE_STATUS,
} from '../constants';

describe('actions', () => {
  it('creates an action to receive a location', () => {
    const date = '2017-05-02T19:02:09';
    const name = 'Richmond, VA';
    const aqi = 62;
    const description = 'Fair air quality';
    const color = '#C7E916';
    const location = {
      date,
      name,
      aqi,
      description,
      color,
    };

    const expectedAction = {
      type: SAVE_LOCATION,
      ...location,
    };
    expect(actions.saveLocation(location)).toEqual(expectedAction);
  });

  it('creates an action to display status', () => {
    const text = 'Request succeeded';
    const status = 'success';

    const expectedAction = {
      type: CHANGE_STATUS,
      text,
      status,
    };
    expect(actions.changeStatus(text, status)).toEqual(expectedAction);
  });
});
