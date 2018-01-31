import React from 'react';

import splash from '../animations/splash.gif';

function Loader(props) {
  const style = {
    display: props.loading ? 'flex' : 'none'
  };

  return (
    <div style={{ ...style }}>
      <img alt="Market Loader" src={splash} />
    </div>
  );
}

export default Loader;
