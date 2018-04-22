import React from 'react';
import ReactDOM from 'react-dom';

import FindContractSuccess from '../../../src/components/FindContract/FindContractSuccess';

describe('FindContractForm', () => {
 
  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<FindContractSuccess contract={{key: 'Key'}}/>, div);
  });

});
