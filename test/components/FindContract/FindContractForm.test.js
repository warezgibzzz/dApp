import React from 'react';
import { Form } from 'antd';
import { List } from 'antd';
import { expect } from 'chai';
import { mount } from 'enzyme';
import sinon from 'sinon';

import FindContractForm from '../../../src/components/FindContract/FindContractForm';

function validAddressFields() {
  return {
    marketContractAddress: { value: '0xf204a4ef082f5c04bb89f7d5e6568b796096735a' }
  };
}

describe('FindContractForm', () => {
  let findContractForm;
  let wrappedFormRef;
  let onFindContractSpy;
  let successMessageSpy;
  let errorMessageSpy;

  beforeEach(() => {
    onFindContractSpy = sinon.spy();
    errorMessageSpy = sinon.spy();
    successMessageSpy = sinon.spy();

    const props = {
      contract: [],
      showErrorMessage: errorMessageSpy,
      showSuccessMessage: successMessageSpy,
      onFindContract: onFindContractSpy,
      validators: { ethAddressValidator: (rule, value, callback) => callback() },
      wrappedComponentRef: (inst) => wrappedFormRef = inst
    };
    findContractForm = mount(<FindContractForm {...props}/>);
  });

  it('should findContract when props.onFindContract is invoked', () => {
    findContractForm.setProps({
      marketContractAddress: {
        marketContractAddress: '0x12345678123456781234567812345678'
      }
    });
    findContractForm.props().onFindContract({});
    expect(onFindContractSpy).to.have.property('callCount', 1);
  });

  it('should not show List if contract is empty', () => {
    findContractForm.setProps({
      contract: []
    });
    expect(findContractForm.find(List)).to.have.length(0);
  });

  it('should show List if contract is not empty', () => {
    findContractForm.setProps({
      contract: [{
        name: 'key',
        value: '0x12345678123456781234567812345678'
      }]
    });
    expect(findContractForm.find(List)).to.have.length(1);
  });

  it('should enable submit button if component is not loading and no errors', () => {
    // no errors are set by default on the form
    findContractForm.setProps({
      loading: false
    });

    const submitButton = findContractForm.find('.submit-button').first();
    expect(submitButton.prop('disabled')).to.equal(false);
  });

  it('should disable submit button when loading', () => {
    findContractForm.setProps({
      loading: true
    });

    const submitButton = findContractForm.find('.submit-button').first();

    expect(submitButton.prop('disabled')).to.equal(true);
  });

  it('should disable submit if fields have errors', () => {
    wrappedFormRef.props.form.setFields({ marketContractAddress: {
      value: '',
      errors: [ new Error('Market Address is required.') ]
    } });

    findContractForm.setProps({
      loading: false
    });
    
    const submitButton = findContractForm.find('.submit-button').first();

    expect(submitButton.prop('disabled')).to.equal(true);
  });

  it('should reset form when .reset-button is clicked', () => {
    const defaultFieldValues = wrappedFormRef.props.form.getFieldsValue();
    wrappedFormRef.props.form.setFields(validAddressFields());    
    findContractForm.setProps({
      loading: false
    });

    const resetButton = findContractForm.find('.reset-button').first();
    resetButton.simulate('click', { preventDefault() {} });

    const valuesAfterReset = wrappedFormRef.props.form.getFieldsValue();
    expect(valuesAfterReset).to.deep.equals(defaultFieldValues);
  });

  it('should call onFindContract() with form values when submitted', () => {
    wrappedFormRef.props.form.setFields(validAddressFields());

    findContractForm.find(Form).first().simulate('submit', { preventDefault() {} });
    expect(onFindContractSpy).to.have.property('callCount', 1);
  });

  it('should not call onFindContract() when form is invalid.', () => {
    wrappedFormRef.props.form.setFields({ marketContractAddress: {
      value: '',
      errors: [ new Error('Market Address is required.') ]
    } });

    findContractForm.find(Form).first().simulate('submit', { preventDefault() {} });
    expect(onFindContractSpy).to.have.property('callCount', 0);
  });

  it('should showSuccessMessage when contract is found', () => {
    findContractForm.setProps({ error: null, loading: true, contract: [] });
    expect(successMessageSpy).to.have.property('callCount', 0);
    findContractForm.setProps({ error: null, loading: false, contract: {
      key: '0x00000'
    } });
    expect(successMessageSpy).to.have.property('callCount', 1);
  });

  it('should showErrorMessage is error is set', () => {
    findContractForm.setProps({ error: null, loading: true});
    expect(errorMessageSpy).to.have.property('callCount', 0);
    findContractForm.setProps({ error: 'Error occured', loading: false });
    expect(errorMessageSpy).to.have.property('callCount', 1);
  });
});
