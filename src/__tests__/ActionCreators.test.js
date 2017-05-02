import * as actions from '../actions';
import {
  RECEIVE_LOCATION,
  CHANGE_STATUS,
} from '../constants';

describe('actions', () => {
  it('creates an action to receive a location', () => {
    const date = new Date();
    const name = 'Richmond, VA';
    const aqi = 62;
    const description = 'Fair air quality';
    const color = 'rgb(181, 226, 30)';
    const location = {
      date,
      name,
      aqi,
      description,
      color,
    };

    const expectedAction = {
      type: RECEIVE_LOCATION,
      ...location,
    };
    expect(actions.receiveLocation(location)).toEqual(expectedAction);
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
