import { LocalStorageMock } from '../../localStoragePolyfill';
import { getHistory, saveToHistory } from '../utilities';

const locations = [
  {
    date: 'May 1',
    name: 'Richmond',
    aqi: 99,
    description: 'Great air quality',
    color: 'green',
  },
  {
    date: 'May 2',
    name: 'Denver',
    aqi: 76,
    description: 'Fair air quality',
    color: 'green',
  },
  {
    date: 'May 3',
    name: 'Austin',
    aqi: 66,
    description: 'Moderate air quality',
    color: 'yellow',
  },
  {
    date: 'May 4',
    name: 'Hong Kong',
    aqi: 35,
    description: 'Moderate air quality',
    color: 'orange',
  },
  {
    date: 'May 5',
    name: 'New Delhi',
    aqi: 18,
    description: 'Poor air quality',
    color: 'red',
  },
];

describe('LocalStorage', () => {
  it('saves last 5 searches to localStorage', () => {
    locations.forEach((location) => {
      saveToHistory(location);
    });
    expect(getHistory()).toHaveLength(5);
  });
  it('saves new entries first', () => {
    expect(getHistory()).toEqual(locations.reverse());
  });
  it('removes the oldest item if searches exceed 5', () => {
    saveToHistory(locations[0]);
    expect(getHistory()).toHaveLength(5);
  });
});
