import React from 'react';
import { shallow } from 'enzyme';
import Event from '../Event';
import { mockData } from '../mock-data';
import { getEvents } from '../api';

describe('<Event /> component', () => {
  let EventWrapper;
  let events;
  beforeAll(() => {
    events = mockData;
    EventWrapper = shallow(<Event event={events[0]} />);
  });

  test('event summary is rendered', () => {
    expect(EventWrapper.find('.summary').text()).toEqual(events[0].summary);
  });

  test('event date and time is rendered with correct value', () => {
    expect(EventWrapper.find('.date').text()).toEqual(events[0].start.dateTime);
  });

  test('event timezone is rendered with correct value', () => {
    expect(EventWrapper.find('.timezone').text()).toEqual(
      `(${events[0].start.timeZone})`
    );
  });

  test('event component contains event details container', () => {
    expect(EventWrapper.find('.event__Details')).toHaveLength(1);
  });
  test('event component contains event calendar link', () => {
    expect(EventWrapper.find('.link')).toHaveLength(1);
  });
  test('event component contains text header for details', () => {
    expect(EventWrapper.find('.detail-title')).toHaveLength(1);
  });

  test('event component contains event decriptions', () => {
    expect(EventWrapper.find('.description')).toHaveLength(1);
  });

  test('event link has correct url from event', () => {
    expect(EventWrapper.find('.link').prop('href')).toEqual(events[0].htmlLink);
  });

  test('event has correct description from event', () => {
    expect(EventWrapper.find('.description').text()).toEqual(
      events[0].description
    );
  });

  test('event component details are hidden before click', () => {
    expect(EventWrapper.find('.visible')).toHaveLength(0);
  });

  test('change state when clicked to show details', () => {
    EventWrapper.find('.details-btn').simulate('click');
    expect(EventWrapper.state('isShowDetails')).toBe(true);
  });

  test('event component details are visible after click', () => {
    EventWrapper.setState({ isShowDetails: false });
    EventWrapper.find('.details-btn').simulate('click');
    expect(EventWrapper.find('.visible')).toHaveLength(1);
  });
});
