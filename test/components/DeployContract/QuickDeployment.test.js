import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import { Form } from 'antd';
import moment from 'moment';

import DeployContractSuccess from '../../../src/components/DeployContract/DeployContractSuccess';
import QuickDeployment from '../../../src/components/DeployContract/QuickDeployment';

describe('QuickDeployment', () => {
  let quickDeployment;
  let switchModeSpy;
  let onDeploySpy;
  let successMessageSpy;
  let errorMessageSpy;

  beforeEach(() => {
    switchModeSpy = sinon.spy();
    onDeploySpy = sinon.spy();
    successMessageSpy = sinon.spy();
    errorMessageSpy = sinon.spy();
    quickDeployment = mount(<QuickDeployment 
      initialValues={{}} 
      switchMode={switchModeSpy} 
      showErrorMessage={errorMessageSpy}
      showSuccessMessage={successMessageSpy}
      onDeployContract={onDeploySpy} />);
  });

  it('should render', () => {
    mount(<QuickDeployment initialValues={{}}/>);
  });

  it('should switch mode to guided when switch-mode-link is clicked', () => {
    quickDeployment.find('.switch-mode-link').simulate('click');
    expect(switchModeSpy.calledWith('guided')).to.equal(true);
  });

  it('should showSuccessMessage when contract is created', () => {
    quickDeployment.setProps({ error: null, loading: true, contract: null });
    expect(successMessageSpy).to.have.property('callCount', 0);
    quickDeployment.setProps({ error: null, loading: false, contract: {
      address: '0x00000'
    } });
    expect(successMessageSpy).to.have.property('callCount', 1);
  });

  it('should showErrorMessage when error occurs', () => {
    quickDeployment.setProps({ error: null, loading: true});
    expect(errorMessageSpy).to.have.property('callCount', 0);
    quickDeployment.setProps({ error: 'Error occured', loading: false });
    expect(errorMessageSpy).to.have.property('callCount', 1);
  });

  it('should disable submit if component is loading', () => {
    quickDeployment.setProps({
      loading: true
    });
    const submitButton = quickDeployment.find('.submit-button').first();
    expect(submitButton.prop('disabled')).to.equal(true);
  });

  it('should disable submit if component is loading', () => {
    quickDeployment.setProps({
      loading: false,
      form: {
        getFieldsError() {
          return {
            contractName: 'Error' // return error
          };
        },
        getFieldDecorator(name, object) {
          return (component) => {
            return component;
          };
        }
      }
    });
    
    const submitButton = quickDeployment.find('.submit-button').first();
    expect(submitButton.prop('disabled')).to.equal(true);
  });

  it('should enable submit button if component is not loading and no errors', () => {
    quickDeployment.setProps({
      loading: false,
      form: {
        getFieldsError() {
          return {};
        },
        getFieldDecorator(name, object) {
          return (component) => {
            return component;
          };
        }
      }
    });

    const submitButton = quickDeployment.find('.submit-button').first();
    expect(submitButton.prop('disabled')).to.equal(false);
  });

  it('should disable reset button when loading', () => {
    quickDeployment.setProps({
      loading: true
    });

    const resetButton = quickDeployment.find('.reset-button').first();
    expect(resetButton.prop('disabled')).to.equal(true);
  });

  it('should reset form when .reset-button is clicked', () => {
    const resetSpy = sinon.spy();
    quickDeployment.setProps({
      loading: false,
      form: {
        getFieldsError() {
          return {};
        },
        getFieldDecorator(name, object) {
          return (component) => {
            return component;
          };
        },
        resetFields: resetSpy
      }
    });

    const resetButton = quickDeployment.find('.reset-button').first();
    resetButton.simulate('click', { preventDefault() {} });
    expect(resetSpy).to.have.property('callCount', 1);
  });

  it('should call onDeployContract with form values when submitted', () => {
    quickDeployment.setProps({
      form: {
        getFieldsError() {
          return {};
        },
        getFieldDecorator(name, object) {
          return (component) => {
            return component;
          };
        },
        validateFields(cb) {
          cb(null, { expirationTimeStamp: moment() });
        }
      }
    });

    quickDeployment.find(Form).first().simulate('submit', { preventDefault() {} });
    expect(onDeploySpy).to.have.property('callCount', 1);
    // TODO: Test the values passed to onDeployContract
  });

  it('should not call onDeployContract when form is invalid.', () => {
    quickDeployment.setProps({
      form: {
        getFieldsError() {
          return {};
        },
        getFieldDecorator(name, object) {
          return (component) => {
            return component;
          };
        },
        validateFields(cb) {
          cb(new Error('Invalid value'));  // error
        }
      }
    });

    quickDeployment.find(Form).first().simulate('submit', { preventDefault() {} });
    expect(onDeploySpy).to.have.property('callCount', 0);
  });
});
