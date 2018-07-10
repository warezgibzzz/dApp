import React from 'react';

import splash from '../animations/splash.gif';

// Styles
import '../less/components/Loader.less';

function Loader(props) {
  return (
    <div className="loader">
      <img alt="Loader" src={splash} />

      {props.message && <span>{props.message}</span>}
    </div>
  );
}

export default Loader;
