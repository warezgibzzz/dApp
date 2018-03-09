import React, { Component } from 'react';

import splashAnimation from './animations/splash.gif';

class Splash extends Component {
  render() {
    return (
      <img src={splashAnimation} alt={this.props.alt} className="market-loader"/>
    );
  }
}

export default Splash;
