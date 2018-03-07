import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import FindContractForm from '../../../src/components/FindContract/FindContractForm';

describe('FindContractForm', () => {
  let findContractForm;
  let onFindContractSpy;
  beforeEach(() => {
    onFindContractSpy = sinon.spy();
    const props = {
      location: {},
      onFindContract: onFindContractSpy
    };
    findContractForm = shallow(<FindContractForm {...props}/>);
  });

  it('should findContract when props.onFindContract is invoked', () => {
    findContractForm.setProps({
      marketContractAddress: {
        marketContractAddress: "0x12345678123456781234567812345678"
      }
    });
    findContractForm.props().onFindContract({});
    expect(onFindContractSpy).to.have.property('callCount', 1);
  });
});
