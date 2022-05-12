import { loadFeature, defineFeature } from 'jest-cucumber';
import React from 'react';
import { mount, shallow } from 'enzyme';
import App from '../App';
import { mockData } from '../mock-data';
import CitySearch from '../CitySearch';
import { extractLocations } from '../api';
import EventList from '../EventList';
import Event from '../Event';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, (test) => {
  let AppWrapper;
  test('By default the list of events will be limited to 32', ({
    given,
    when,
    then,
  }) => {
    given('user has loaded the app', async () => {
      AppWrapper = await mount(<App />);
      expect(AppWrapper).toHaveLength(1);
    });

    when('the user is viewing the list of events', () => {
      expect(AppWrapper.find(EventList)).toHaveLength(1);
    });

    then('the length of the list of events should be 32', () => {
      expect(AppWrapper.state('events')).toHaveLength(32);
    });
  });

  test('When the user updates the number of events input the length of the list will change', ({
    given,
    when,
    then,
  }) => {
    given('the user has typed a number in the number of events input', () => {
      AppWrapper.find('.number').simulate('change', {
        target: { value: 10 },
      });
    });

    when('the number of events is updated', () => {
      expect(AppWrapper.state('numberOfEvents')).toEqual(10);
      AppWrapper.update();
    });

    then(
      'the length of the list of events will change to match that number',
      () => {
        expect(AppWrapper.state('events')).toHaveLength(10);
        expect(AppWrapper.find('.event')).toHaveLength(10);
      }
    );
  });
});
