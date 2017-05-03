import React from 'react';
import { shallow } from 'enzyme';
import HistoryTableRow from '../components/HistoryTableRow';

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

  const enzymeWrapper = shallow(<HistoryTableRow {...props} />);

  return {
    props,
    enzymeWrapper,
  };
}

describe('HistoryTableRow component', () => {
  const { enzymeWrapper, props } = setup();
  it('renders 5 table data cells', () => {
    expect(enzymeWrapper.find('td')).toHaveLength(5);
  });
  it('displays the location name in the second column', () => {
    expect(enzymeWrapper.find('td').at(1).text()).toEqual(props.location.name);
  });
  it('displays the location AQI in the third column', () => {
    expect(enzymeWrapper.find('td').at(2).text()).toEqual(props.location.aqi.toString());
  });
  it('displays the location description in the fifth column', () => {
    expect(enzymeWrapper.find('td').at(4).text()).toEqual(props.location.description);
  });
});
