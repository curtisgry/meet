import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
    this.setState({ query: value, suggestions });
  };

  handleItemClicked = (suggestion) => {
    const { updateEvents } = this.props;
    this.setState({
      query: suggestion,
      showSuggestions: false,
    });
    updateEvents({ location: suggestion });
  };

  render() {
    const { query, showSuggestions, suggestions } = this.state;
    return (
      <div className="CitySearch">
        <input
          type="text"
          className="city"
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
