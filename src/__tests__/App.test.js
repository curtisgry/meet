import React from 'react';
import { shallow, mount } from 'enzyme';
import App from '../App';
import EventList from '../EventList';
import CitySearch from '../CitySearch';
import NumberOfEvents from '../NumberOfEvents';
import { mockData } from '../mock-data';
import { extractLocations, getEvents } from '../api';

describe('<App /> component', () => {
  let AppWrapper;
  beforeAll(() => {
    AppWrapper = shallow(<App />);
  });
  test('remder list of evets', () => {
    expect(AppWrapper.find(EventList)).toHaveLength(1);
  });

  test('render CitySearch', () => {
    expect(AppWrapper.find(CitySearch)).toHaveLength(1);
  });

  test('render number of events', () => {
    expect(AppWrapper.find(NumberOfEvents)).toHaveLength(1);
  });
});

describe('<App /> integration', () => {
  test('App passes "events" state as a prop to EventList', () => {
    const AppWrapper = mount(<App />);
    const AppEventsState = AppWrapper.state('events');
    expect(AppEventsState).not.toEqual(undefined);
    expect(AppWrapper.find(EventList).props().events).toEqual(AppEventsState);
    AppWrapper.unmount();
  });

  test('App passes "locations" state as a prop to CitySearch', () => {
    const AppWrapper = mount(<App />);
    const AppLocationsState = AppWrapper.state('locations');
    expect(AppLocationsState).not.toEqual(undefined);
    expect(AppWrapper.find(CitySearch).props().locations).toEqual(
      AppLocationsState
    );
    AppWrapper.unmount();
  });

  test('get list of events matching the city selected by the user', async () => {
    const AppWrapper = mount(<App />);
    const CitySearchWrapper = AppWrapper.find(CitySearch);
    const locations = extractLocations(mockData);
    CitySearchWrapper.setState({ suggestions: locations });
    const suggestions = CitySearchWrapper.state('suggestions');
    const selectedIndex = Math.floor(Math.random() * suggestions.length);
    const selectedCity = suggestions[selectedIndex];
    await CitySearchWrapper.instance().handleItemClicked(selectedCity);
    const allEvents = await getEvents();
    const eventsToShow = allEvents.filter(
      (event) => event.location === selectedCity
    );
    expect(AppWrapper.state('events')).toEqual(eventsToShow);
    AppWrapper.unmount();
  });

  test('get list of all events when user selects "see all cities"', async () => {
    const AppWrapper = mount(<App />);
    const suggestionItems = AppWrapper.find(CitySearch).find('.suggestions li');
    await suggestionItems.at(suggestionItems.length - 1).simulate('click');
    const allEvents = await getEvents();
    expect(AppWrapper.state('events')).toEqual(allEvents.slice(0, 32));
    AppWrapper.unmount();
  });

  test('number of events loaded by default is 32', async () => {
    const AppWrapper = mount(<App />);
    const allEvents = await getEvents();
    expect(AppWrapper.state('numberOfEvents')).not.toEqual(undefined);
    const defaultLength = AppWrapper.state('numberOfEvents');

    expect(AppWrapper.state('events')).toEqual(
      allEvents.slice(0, defaultLength)
    );
    AppWrapper.unmount();
  });

  test('number of events is updated by <NumberOfEvents/>', async () => {
    const AppWrapper = mount(<App />);
    const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
    const allEvents = await getEvents();

    await NumberOfEventsWrapper.instance().handleChange({
      target: { value: 10 },
    });

    expect(AppWrapper.state('events')).toEqual(allEvents.slice(0, 10));

    AppWrapper.unmount();
  });

  test('<EventList/> prop "events" matches <App/> state "events" when changed', async () => {
    const AppWrapper = mount(<App />);
    const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
    await getEvents();
    await NumberOfEventsWrapper.instance().handleChange({
      target: { value: 10 },
    });

    // Update wrapper so state passed as props will update
    AppWrapper.update();

    const EventListWrapper = AppWrapper.find(EventList);

    expect(EventListWrapper.prop('events')).toEqual(AppWrapper.state('events'));

    AppWrapper.unmount();
  });

  test('<EventList/> loads the correct amount of events in a list when <App/> state changed', async () => {
    const AppWrapper = mount(<App />);
    const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
    await getEvents();
    await NumberOfEventsWrapper.instance().handleChange({
      target: { value: 10 },
    });

    // Update wrapper so state passed as props will update
    AppWrapper.update();

    const EventListWrapper = AppWrapper.find(EventList);

    expect(EventListWrapper.find('.event-list li')).toHaveLength(
      AppWrapper.state('events').length
    );

    AppWrapper.unmount();
  });
});
