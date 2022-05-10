import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
    const { event } = this.props;
    const { isShowDetails } = this.state;
    return (
      <div className="event">
        <b className="summary">{event.summary}</b>

        <p className="date">{event.start.dateTime}</p>
        <span className="timezone">({event.start.timeZone})</span>
        <div className={`details ${isShowDetails ? 'visible' : ''}`}>
          <h5 className="detail-title">About event:</h5>
          <a href={event.htmlLink} className="link">
            See details on Google Calendar
          </a>
          <p className="description">{event.description}</p>
        </div>
        <button
          className="details-btn"
          type="button"
          onClick={this.handleItemClicked}
        >
          Details
        </button>
      </div>
    );
  }
}

Event.propTypes = {
  event: PropTypes.shape({
    summary: PropTypes.string.isRequired,
    start: PropTypes.object.isRequired,
    htmlLink: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }),
};

export default Event;
