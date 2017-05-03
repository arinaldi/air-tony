import React from 'react';
import { shallow } from 'enzyme';
import InputForm from '../components/InputForm';

describe('InputForm component', () => {
  const fetchLocation = () => {};
  const changeStatus = () => {};

  it('disables submit button with no input text', () => {
    const wrapper = shallow(
      <InputForm
        fetchLocation={fetchLocation}
        changeStatus={changeStatus}
      />,
    );
    wrapper.setState({ inputText: '' });
    const button = wrapper.find('input[type="submit"]');
    expect(button.props()).toHaveProperty('disabled', true);
  });

  it('enables submit button with input text', () => {
    const wrapper = shallow(
      <InputForm
        inputText={'austin'}
        fetchLocation={fetchLocation}
        changeStatus={changeStatus}
      />,
    );
    wrapper.setState({ inputText: 'austin' });
    const button = wrapper.find('input[type="submit"]');
    expect(button.props()).toHaveProperty('disabled', false);
  });
});
