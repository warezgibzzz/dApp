import React from 'react';

import splash from '../animations/splash.gif';

const fullScreenStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,

  zIndex: 1,

  background: 'white',
  opacity: 0.4,

  alignItems: 'center',
  justifyContent: 'center'
};

function Loader(props) {
  const style = {
    display: props.loading ? 'flex' : 'none'
  };

  return (
    <div style={{ ...fullScreenStyle, ...style }}>
      <img alt="Market Loader" src={splash} />
    </div>
  );
}

export default Loader;
