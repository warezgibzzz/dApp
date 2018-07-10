import React, { Component } from 'react';

import splashAnimation from './animations/splash.gif';

class Splash extends Component {
  render() {
    return (
      <div className="loader">
        <img src={splashAnimation} alt={this.props.alt} />
      </div>
    );
  }
}

export default Splash;
