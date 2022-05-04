import React, { Component } from 'react';

class Event extends Component {
  constructor() {
    super();
    this.state = {
      isShowDetails: false,
    };
  }

  handleItemClicked = () => {
    this.setState((prevState) => ({ isShowDetails: !prevState.isShowDetails }));
  };

  render() {
    return (
      <div className="Event">
        <b className="summary">{this.props.event.summary}</b>

        <p className="date">{this.props.event.date}</p>
        <span className="timezone">({this.props.event.timezone})</span>
        <div className={`details ${this.state.isShowDetails ? 'visible' : ''}`}>
          <h5 className="detail-title">About event:</h5>
          <a href={this.props.event.htmlLink} className="link">
            See details on Google Calendar
          </a>
          <p className="description">{this.props.event.description}</p>
        </div>
        <button
          className="details-button"
          type="button"
          onClick={this.handleItemClicked}
        >
          Details
        </button>
      </div>
    );
  }
}
export default Event;
