import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { InfoAlert } from './Alert';

class CitySearch extends Component {
  constructor() {
    super();
    this.state = {
      query: '',
      suggestions: [],
      showSuggestions: undefined,
    };
  }

  handleInputChange = (event) => {
    const { value } = event.target;
    const { locations } = this.props;
    const suggestions = locations.filter(
      (location) => location.toUpperCase().indexOf(value.toUpperCase()) > -1
    );
    if (suggestions.length === 0) {
      this.setState({
        query: value,
        infoText:
          'We can not find the city you are looking for. Please try another city',
      });
    } else {
      return this.setState({
        query: value,
        suggestions,
        infoText: '',
      });
    }
  };

  handleItemClicked = (suggestion) => {
    const { updateEvents } = this.props;
    this.setState({
      query: suggestion,
      showSuggestions: false,
      infoText: '',
    });
    updateEvents({ location: suggestion });
  };

  render() {
    const { query, showSuggestions, suggestions, infoText } = this.state;
    return (
      <div className="CitySearch">
        <InfoAlert text={infoText} />
        <input
          type="text"
          className="city"
          placeholder="Find A Location"
          value={query}
          onChange={this.handleInputChange}
          onFocus={() => {
            this.setState({ showSuggestions: true });
          }}
        />
        <ul
          className="suggestions"
          style={showSuggestions ? {} : { display: 'none' }}
        >
          {suggestions.map((suggestion) => (
            <li
              key={suggestion}
              onClick={() => this.handleItemClicked(suggestion)}
            >
              {suggestion}
            </li>
          ))}
          <li key="all" onClick={() => this.handleItemClicked('all')}>
            <b>See all cities</b>
          </li>
        </ul>
      </div>
    );
  }
}

CitySearch.propTypes = {
  updateEvents: PropTypes.func.isRequired,
  locations: PropTypes.array.isRequired,
};

export default CitySearch;
