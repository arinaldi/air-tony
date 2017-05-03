import React from 'react';
import { shallow } from 'enzyme';
import CurrentLocation from '../components/CurrentLocation';

const location = {
  date: 'May 2',
  name: 'Richmond',
  aqi: 99,
  description: 'Great air quality',
  color: 'green',
};

function setup() {
  const props = {
    location,
  };

  const enzymeWrapper = shallow(<CurrentLocation {...props} />);

  return {
    props,
    enzymeWrapper,
  };
}

describe('CurrentLocation component', () => {
  const { enzymeWrapper, props } = setup();
  it('renders an h4 with the location name', () => {
    expect(enzymeWrapper.find('h4').text()).toEqual(props.location.name);
  });
  it('renders a paragraph with the AQI', () => {
    expect(enzymeWrapper.find('p').text()).toEqual(props.location.aqi.toString());
  });
  it('renders the circle class', () => {
    expect(enzymeWrapper.find('p').hasClass('big-circle')).toBe(true);
  });
});
