import React, { Component } from 'react';

import splashAnimation from './animations/splash.gif';

class Splash extends Component {
  render() {
    var splashStyle = { textAlign: 'center', margin: '0 auto', top: '25%', position: 'absolute', width: '100%' };  // center splash in screen

    return (
      <div className="Splash" style={splashStyle}>
        <img src={splashAnimation} alt={this.props.alt} style={{width: '80px', height: '80px'}}/>
      </div>
    );
  }
}

export default Splash;
