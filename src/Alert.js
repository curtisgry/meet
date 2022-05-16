import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Alert extends Component {
  constructor(props) {
    super(props);
    this.color = null;
    this.className = '';
  }

  getStyle = () => ({
    color: this.color,
  });

  getClassName = () => this.className;

  render() {
    const { text } = this.props;
    return (
      <div className={this.getClassName()}>
        <p style={this.getStyle()}>{text}</p>
      </div>
    );
  }
}

Alert.propTypes = {
  text: PropTypes.string,
};

class InfoAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = 'blue';
    this.className = 'alert-info';
  }
}

class ErrorAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = 'red';
    this.className = 'alert-error';
  }
}

export { InfoAlert, ErrorAlert };
