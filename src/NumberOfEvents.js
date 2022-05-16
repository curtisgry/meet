import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ErrorAlert } from './Alert';

class NumberOfEvents extends Component {
  constructor() {
    super();
    this.state = {
      eventNumberValue: 32,
    };
  }

  handleChange = (event) => {
    const { updateEvents } = this.props;
    const { value } = event.target;
    if (value < 1 || value > 50) {
      return this.setState({
        eventNumberValue: value,
        errorText: 'Must enter a number between 0 and 50',
      });
    }
    this.setState({ eventNumberValue: value, errorText: '' });

    updateEvents({ eventCount: value });
  };

  render() {
    const { eventNumberValue, errorText } = this.state;
    return (
      <div className="event-number-input">
        <label>
          <p>Event list length</p>
          <input
            className="number"
            onChange={this.handleChange}
            value={eventNumberValue}
          />
        </label>
        <ErrorAlert text={errorText} />
      </div>
    );
  }
}

NumberOfEvents.defaultProps = {
  updateEvents: () => {},
};

NumberOfEvents.propTypes = {
  updateEvents: PropTypes.func,
};

export default NumberOfEvents;
