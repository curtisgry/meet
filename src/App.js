import React, { Component } from 'react';
import './App.css';
import './nprogress.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import WelcomeScreen from './WelcomeScreen';
import { extractLocations, getEvents, checkToken, getAccessToken } from './api';
import { InfoAlert } from './Alert';

class App extends Component {
  constructor() {
    super();
    this.state = {
      events: [],
      locations: [],
      numberOfEvents: 32,
      showWelcomeScreen: undefined,
    };
  }

  async componentDidMount() {
    this.mounted = true;
    // if offline return after setting events to avoid errors
    if (!navigator.onLine) {
      getEvents().then((events) => {
        console.log(events);
        if (this.mounted) {
          this.setState({
            events: [...events.slice(0, 32)],
            locations: extractLocations(events),
            showWelcomeScreen: false,
          });
        }
      });
      return;
    }
    const accessToken = localStorage.getItem('access_token');
    /* eslint-disable */
    const isTokenValid = (await checkToken(accessToken)).error ? false : true;
    /* eslint-disable */
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");
    this.setState({ showWelcomeScreen: !(code || isTokenValid) });
    getEvents().then((events) => {
      console.log(events)
      if ((code || isTokenValid) && this.mounted) {
        this.setState({
          events: [...events.slice(0, 32)],
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
    const { numberOfEvents } = this.state;
    const eventsLength = eventCount || numberOfEvents;
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
    const { locations, events, showWelcomeScreen } = this.state;
    if (showWelcomeScreen === undefined) {
      return <div className="App" />;
    }

    return (
      <div className="App">
        {!navigator.onLine ? (
          <InfoAlert
            className="offline-alert"
            text="App is offline, to get the most recent list of events you will need to connect to the internet."
          />
        ) : (
          ''
        )}
        <div className='logo'></div>
        <CitySearch locations={locations} updateEvents={this.updateEvents} />
        <NumberOfEvents updateEvents={this.updateEvents} />
        <EventList events={events} />
        <WelcomeScreen
          showWelcomeScreen={this.state.showWelcomeScreen}
          getAccessToken={() => {
            getAccessToken();
          }}
        />
      </div>
    );
  }
}

export default App;
