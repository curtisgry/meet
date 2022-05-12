import { loadFeature, defineFeature } from 'jest-cucumber';
import React from 'react';
import { mount, shallow } from 'enzyme';
import App from '../App';
import { mockData } from '../mock-data';
import CitySearch from '../CitySearch';
import { extractLocations } from '../api';
import EventList from '../EventList';
import Event from '../Event';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, (test) => {
  let AppWrapper;
  test("When user hasn't clicked the details button no details are shown.", ({
    given,
    when,
    then,
  }) => {
    given("user hasn't clicked on a details button", async () => {
      AppWrapper = await mount(<App />);

      expect(AppWrapper.find(EventList)).toHaveLength(1);
    });

    when('the user is viewing the list of events', () => {
      AppWrapper.update();
      expect(AppWrapper.find('.event')).toHaveLength(
        mockData.slice(0, 32).length
      );
    });

    then('the details for each event should be hidden', () => {
      expect(AppWrapper.find('.event__Details .visible')).toHaveLength(0);
    });
  });

  test('When user clicks the details button on an event the details are shown', ({
    given,
    when,
    then,
  }) => {
    given('the user is viewing a list of events', () => {
      AppWrapper.update();
      expect(AppWrapper.find('.event')).toHaveLength(
        mockData.slice(0, 32).length
      );
    });

    when('the details button is clicked', () => {
      AppWrapper.find('.details-btn').at(0).simulate('click');
    });

    then('the details for that event will be shown', () => {
      AppWrapper.update();
      expect(AppWrapper.find('.visible')).toHaveLength(1);
    });
  });

  test('When a user clicks the details button on an event that is showing details the details will then be hidden', ({
    given,
    when,
    then,
  }) => {
    given('user has details open on an event', () => {
      expect(AppWrapper.find('.visible')).toHaveLength(1);
    });

    when('the details button is clicked', () => {
      AppWrapper.find('.details-btn').at(0).simulate('click');
    });

    then('the details for that event will be hidden', () => {
      expect(AppWrapper.find('.visible')).toHaveLength(0);
    });
  });
});
