import React, { Component } from 'react';

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
    const suggestions = this.props.locations.filter(
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
    updateEvents(suggestion);
  };

  render() {
    return (
      <div className="CitySearch">
        <input
          type="text"
          className="city"
          value={this.state.query}
          onChange={this.handleInputChange}
          onFocus={() => {
            this.setState({ showSuggestions: true });
          }}
        />
        <ul
          className="suggestions"
          style={this.state.showSuggestions ? {} : { display: 'none' }}
        >
          {this.state.suggestions.map((suggestion) => (
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

export default CitySearch;
