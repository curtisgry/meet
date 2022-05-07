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
    };
  }

  componentDidMount() {
    getEvents().then((events) => {
      this.setState({ events, locations: extractLocations(events) });
    });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  updateEvents = (location) => {
    getEvents().then((events) => {
      const locationEvents =
        location === 'all'
          ? events
          : events.filter((event) => event.location === location);
      this.setState({
        events: locationEvents,
      });
    });
  };

  render() {
    const { locations, events } = this.state;
    return (
      <div className="App">
        <CitySearch locations={locations} updateEvents={this.updateEvents} />
        <EventList events={events} />
        <NumberOfEvents />
      </div>
    );
  }
}

export default App;
