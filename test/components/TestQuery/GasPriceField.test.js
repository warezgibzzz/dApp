import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Select, Input } from 'antd';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import { expect } from 'chai';

import GasPriceField from '../../../src/components/TestQuery/GasPriceField';

describe('GasPriceField', () => {
  let gasPriceField;
  beforeEach(() => {
    gasPriceField = mount(<GasPriceField />);
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<GasPriceField />, div);
  });

  it('should display two input felds to accept gas limit and gas price', () => {
    expect(gasPriceField.find(Input)).to.have.length(2);
  });
});
