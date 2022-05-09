import React, { Component } from 'react';
import './App.css';
import './nprogress.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { extractLocations, getEvents } from './api';

class App extends Component {
  constructor() {
    super();
    this.state = {
      events: [],
      locations: [],
      numberOfEvents: 32,
    };
  }

  componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({
          events: [...events.slice(0, this.state.numberOfEvents)],
          locations: extractLocations(events),
        });
      }
    });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  updateEvents = ({ location, eventCount }) => {
    // eventsLength will either be count passed to function or current length in state
    const eventsLength = eventCount || this.state.numberOfEvents;
    getEvents().then((events) => {
      let locationEvents;
      if (location) {
        locationEvents =
          location === 'all'
            ? events.slice(0, eventsLength)
            : events
                .filter((event) => event.location === location)
                .slice(0, eventsLength);
      } else {
        // if no location passed to function only length of list will change
        locationEvents = events.slice(0, eventsLength);
      }

      this.setState({
        events: [...locationEvents],
        numberOfEvents: eventsLength,
      });
    });
  };

  render() {
    const { locations, events } = this.state;
    return (
      <div className="App">
        <CitySearch locations={locations} updateEvents={this.updateEvents} />
        <NumberOfEvents updateEvents={this.updateEvents} />
        <EventList events={events} />
      </div>
    );
  }
}

export default App;
