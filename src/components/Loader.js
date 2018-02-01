import React from 'react';

import splash from '../animations/splash.gif';

function Loader(props) {
  const style = {
    display: props.loading ? 'flex' : 'none',
    'justify-content': 'center'
  };
  const imageStyle = props.style || {}

  return (
    <div style={{ ...style }}>
      <img alt="Market Loader" src={splash} style={{ ...imageStyle }} />
    </div>
  );
}

export default Loader;
