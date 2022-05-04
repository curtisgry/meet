import React, { Component } from 'react';

export default class NumberOfEvents extends Component {
  constructor() {
    super();
    this.state = {
      numberOfEvents: 32,
    };
  }

  handleChange = (event) => {
    const { value } = event.target;
    this.setState({ numberOfEvents: value });
  };

  render() {
    const { numberOfEvents } = this.state;
    return (
      <div>
        <input
          className="number"
          onChange={this.handleChange}
          value={numberOfEvents}
        />
      </div>
    );
  }
}
