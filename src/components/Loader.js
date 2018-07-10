import React from 'react';

import splash from '../animations/splash.gif';

// Styles
import '../less/components/Loader.less';

Loader.defaultProps = {
  loading: false
};

function Loader(props) {
  const style = {
    display: props.loading ? 'flex' : 'none'
  };

  return (
    <div className="loader">
      <img alt="Loader" src={splash} style={{ ...style }} />

      {props.message && <span>{props.message}</span>}
    </div>
  );
}

export default Loader;
