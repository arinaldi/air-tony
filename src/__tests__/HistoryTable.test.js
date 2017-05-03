import React from 'react';
import { shallow } from 'enzyme';
import HistoryTable from '../components/HistoryTable';
import HistoryTableRow from '../components/HistoryTableRow';

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

function setup() {
  const props = {
    locations,
  };

  const enzymeWrapper = shallow(<HistoryTable {...props} />);

  return {
    props,
    enzymeWrapper,
  };
}

describe('HistoryTable component', () => {
  const { enzymeWrapper } = setup();
  it('renders 5 columns in the header row', () => {
    expect(enzymeWrapper.find('th')).toHaveLength(5);
  });
  it('render the correct number of rows', () => {
    expect(enzymeWrapper.find(HistoryTableRow)).toHaveLength(2);
  });
});
