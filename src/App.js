import React, { Component } from 'react';
import './App.css';
import './nprogress.css';
import {
  ResponsiveContainer,
  ScatterChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Scatter,
} from 'recharts';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import WelcomeScreen from './WelcomeScreen';
import { extractLocations, getEvents, checkToken, getAccessToken } from './api';
import { InfoAlert } from './Alert';
import EventGenre from './EventGenre';

class App extends Component {
  constructor() {
    super();
    this.state = {
      events: [],
      locations: [],
      numberOfEvents: 32,
      showWelcomeScreen: false,
    };
  }

  async componentDidMount() {
    this.mounted = true;

    // if offline or in dev environment return after setting events to avoid errors
    if (!navigator.onLine || window.location.href.includes('localhost')) {
      getEvents().then((events) => {
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

  getData = ()=> {
    const {locations, events} = this.state;
    const data = locations.map((location) => {
      const number = events.filter((event) => event.location === location).length
      const city = location.split(', ').shift()
      return {city, number}
    })
    return data;
  }

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
        <h4>Events in each city</h4>
          <div className='data-vis-wrapper'>
          <EventGenre events={events}/>
        <ResponsiveContainer height={400}>
          <ScatterChart
            margin={{
              top: 20, right: 20, bottom: 20, left: 20,
            }}
          >
            <CartesianGrid />
            <XAxis type="category" dataKey="city" name="city"/>
            <YAxis type="number" dataKey="number" name="number of events" allowDecimals={false}/>
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Scatter data={this.getData()} fill="#8884d8" />
          </ScatterChart>
        </ResponsiveContainer>
        </div>
        <EventList events={events} />
        <WelcomeScreen
          showWelcomeScreen={showWelcomeScreen}
          getAccessToken={() => {
            getAccessToken();
          }}
        />
      </div>
    );
  }
}

export default App;
