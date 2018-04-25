import React from 'react';
import { mount } from 'enzyme';

import FindContractField from '../../../src/components/FindContract/FindContractField';

describe('FindContractField', () => {
  let name, form, validators; 
  beforeEach(() => {
    name = 'marketContractAddress';
    form = {
      getFieldDecorator(name, params) {
        return component => component;
      }
    };
    validators = {
      ethAddressValidator(rule, value, callback) {}
    };
  });

  it('should render FindContractField successfully', () => {
    const props = {
      name, form, validators
    };
    mount(<FindContractField {...props}/>);
  });
});
