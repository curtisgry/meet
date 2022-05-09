import React, { Component } from 'react';

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
        <input
          className="number"
          onChange={this.handleChange}
          value={eventNumberValue}
        />
      </div>
    );
  }
}

NumberOfEvents.defaultProps = {
  updateEvents: () => {},
};

export default NumberOfEvents;
