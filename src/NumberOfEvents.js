import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
    this.setState({ eventNumberValue: value });

    updateEvents({ eventCount: value });
  };

  render() {
    const { eventNumberValue } = this.state;
    return (
      <div>
        <label>
          <p>Event list length</p>
          <input
            className="number"
            onChange={this.handleChange}
            value={eventNumberValue}
          />
        </label>
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
