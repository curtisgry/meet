import React from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
  let NumberOfEventsWrapper;
  beforeAll(() => {
    NumberOfEventsWrapper = shallow(<NumberOfEvents />);
  });

  test('number of events exists in components state', () => {
    expect(NumberOfEventsWrapper.state('numberOfEvents')).toBe(32);
  });

  test('text input for number of events is rendered', () => {
    expect(NumberOfEventsWrapper.find('.number')).toHaveLength(1);
  });

  test('update number of events when input is changed', () => {
    NumberOfEventsWrapper.find('.number').simulate('change', {
      target: { value: 8 },
    });
    expect(NumberOfEventsWrapper.state('numberOfEvents')).toBe(8);
  });
});
