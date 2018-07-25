import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import { Button, Form, Input, InputNumber } from 'antd';
import { mount } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

import {
  NameContractStep,
  PricingStep,
  ExpirationStep,
  DataSourceStep,
  DeployStep,
  ExchangeStep
} from '../../../src/components/DeployContract/Steps';
import Field from '../../../src/components/DeployContract/DeployContractField';

describe('NameContractStep', () => {
  let nameContractStep;

  beforeEach(() => {
    nameContractStep = mount(<NameContractStep />);
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<NameContractStep />, div);
  });

  it('should display two input felds to accept name and collateral token address', () => {
    expect(nameContractStep.find(Input)).to.have.length(2);
  });

  it('should have a next button', () => {
    expect(nameContractStep.find(Button)).to.have.length(1);
  });
});

describe('PricingStep', () => {
  let pricingStep;

  beforeEach(() => {
    pricingStep = mount(<PricingStep />);
    pricingStep.setProps({
      step: 3
    });
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<PricingStep />, div);
  });

  it('should display four inputs felds to accept price cap, price floor, multiplier & decimal address', () => {
    expect(pricingStep.find(InputNumber)).to.have.length(4);
  });

  it('should have two buttons to navigate back and forward', () => {
    expect(pricingStep.find(Button)).to.have.length(2);
  });
});

describe('PricingStep Simplified', () => {
  let pricingStep;
  let updateDeploymentStateSpy;
  let onNextClickedSpy;
  const priceFloor = 1;
  const price = 2;
  const priceCap = 3;

  beforeEach(() => {
    updateDeploymentStateSpy = sinon.spy();
    onNextClickedSpy = sinon.spy();
    pricingStep = mount(
      <PricingStep
        updateDeploymentState={updateDeploymentStateSpy}
        onNextClicked={onNextClickedSpy}
        isSimplified
        price={price}
        step={2}
        priceCap={priceCap}
        priceFloor={priceFloor}
      />
    );
  });

  it('should display two fields to accept price cap and price floor', () => {
    const pricingStep = mount(<PricingStep isSimplified price={price} />);
    expect(pricingStep.find(InputNumber)).to.have.length(2);
  });

  it('should have two buttons to navigate back and forward', () => {
    expect(pricingStep.find(Button)).to.have.length(2);
  });

  it('should not proceed on error in form: price floor too low', () => {
    pricingStep.setProps({
      price: 1.0,
      priceCap: 1.5,
      priceFloor: 0.4
    });
    pricingStep.find(Form).simulate('submit');
    expect(updateDeploymentStateSpy).to.have.property('callCount', 0);
    expect(onNextClickedSpy).to.have.property('callCount', 0);
  });

  it('should not proceed on error in form: price cap too high', () => {
    pricingStep.setProps({
      price: 1.0,
      priceCap: 1.6,
      priceFloor: 0.6
    });
    pricingStep.find(Form).simulate('submit');
    expect(updateDeploymentStateSpy).to.have.property('callCount', 0);
    expect(onNextClickedSpy).to.have.property('callCount', 0);
  });
});

describe('ExpirationStep', () => {
  let updateDeploymentStateSpy;
  let onNextClickedSpy;
  let expirationStep;

  beforeEach(() => {
    updateDeploymentStateSpy = sinon.spy();
    onNextClickedSpy = sinon.spy();

    expirationStep = mount(
      <ExpirationStep
        onNextClicked={onNextClickedSpy}
        updateDeploymentState={updateDeploymentStateSpy}
      />
    );
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ExpirationStep />, div);
  });

  it('renders guided display 0 input field and 2 input number fields', () => {
    expect(expirationStep.find(Input)).to.have.length(0);
    expect(expirationStep.find(InputNumber)).to.have.length(2);
  });

  it('should updateDeploymentState on submit', () => {
    expirationStep.setProps({
      expirationTimeStamp: 1234567,
      form: {
        validateFields(cb) {
          cb(null, {});
        },
        getFieldDecorator(name, object) {
          return component => component;
        }
      }
    });

    expirationStep.find(Form).simulate('submit');
    expect(updateDeploymentStateSpy).to.have.property('callCount', 1);
    expect(onNextClickedSpy).to.have.property('callCount', 1);
  });

  it('should not updateDeploymentState on error in form', () => {
    expirationStep.setProps({
      expirationTimeStamp: 1234567,
      form: {
        validateFields(cb) {
          cb(new Error('Test field fails'));
        },
        getFieldDecorator(name, object) {
          return component => component;
        }
      }
    });

    expirationStep.find(Form).simulate('submit');
    expect(updateDeploymentStateSpy).to.have.property('callCount', 0);
    expect(onNextClickedSpy).to.have.property('callCount', 0);
  });

  it('should normalized expirationTimeStamp to seconds if value exists', () => {
    const currentMoment = moment();
    const expectedTimeStamp = Math.floor(currentMoment.valueOf() / 1000);
    expirationStep.setProps({
      form: {
        validateFields(cb) {
          cb(null, { expirationTimeStamp: currentMoment });
        },
        getFieldDecorator(name, object) {
          return component => component;
        }
      }
    });

    expirationStep.find(Form).simulate('submit');
    expect(updateDeploymentStateSpy.args[0][0].expirationTimeStamp).to.equals(
      expectedTimeStamp
    );
  });
});

describe('DataSourceStep', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<DataSourceStep initialValues={{}} />, div);
  });
});

describe('DeployStep', () => {
  let deployStep;
  let onDeployContractSpy;
  let onResetDeploymentStateSpy;
  let showErrorMessageSpy;
  let showSuccessMessageSpy;

  beforeEach(() => {
    onDeployContractSpy = sinon.spy();
    onResetDeploymentStateSpy = sinon.spy();
    showErrorMessageSpy = sinon.spy();
    showSuccessMessageSpy = sinon.spy();

    deployStep = mount(
      <DeployStep
        onDeployContract={onDeployContractSpy}
        onResetDeploymentState={onResetDeploymentStateSpy}
        showErrorMessage={showErrorMessageSpy}
        showSuccessMessage={showSuccessMessageSpy}
      />
    );
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<DeployStep />, div);
  });

  it('should call onUpdateCurrStep if next props have a different currentStep value', () => {
    let instance = deployStep.instance();
    deployStep.setProps({ currentStep: null });
    expect(instance.state.currStepNum).to.equal(1);
    deployStep.setProps({ currentStep: 'pending' });
    expect(instance.state.currStepNum).to.equal(1);
    deployStep.setProps({ currentStep: 'contractDeploying' });
    expect(instance.state.currStepNum).to.equal(1);
    deployStep.setProps({ currentStep: 'deploymentComplete' });
    expect(instance.state.currStepNum).to.equal(2);
    deployStep.setProps({ currentStep: 'collateralPoolDeploying' });
    expect(instance.state.currStepNum).to.equal(2);
    deployStep.setProps({ currentStep: 'rejected' });
    expect(instance.state.currStepNum).to.equal(3);
    deployStep.setProps({ currentStep: 'fulfilled' });
    expect(instance.state.currStepNum).to.equal(3);
  });

  it('should call props.onResetDeploymentState and props.onDeployContract when the retry button is clicked', () => {
    let instance = deployStep.instance();
    deployStep.setProps({ currentStep: 'rejected' });
    deployStep
      .find('#retry-button')
      .first()
      .simulate('click');
    expect(onResetDeploymentStateSpy.callCount).to.equal(1);
    expect(onDeployContractSpy).to.have.property('callCount', 0);
  });

  it('should call onUpdateTxHashes when props change, updating txHashes state var with new tx hash values', () => {
    let instance = deployStep.instance();
    deployStep.setProps({
      contractDeploymentTxHash: 'val1',
      collateralPoolDeploymentTxHash: 'val2'
    });
    expect(instance.state.txHashes['Contract Deployment']).to.equal('val1');
    expect(instance.state.txHashes['Collateral Pool Deployment']).to.equal(
      'val2'
    );
  });

  it('should call props.showErrorMessage if next props have an error value', () => {
    deployStep.setProps({ error: null, loading: true });
    deployStep.setProps({ error: new Error('err'), loading: false });
    expect(showErrorMessageSpy).to.have.property('callCount', 1);
  });

  it('should call showSuccessMessage if new props has contract', () => {
    deployStep.setProps({ contract: null, loading: true });
    deployStep.setProps({ contract: { address: '0x00000' }, loading: false });
    expect(showSuccessMessageSpy).to.have.property('callCount', 1);
  });
});

describe('ExchangeStep', () => {
  let exchangeStep;
  let updateDeploymentStateSpy;
  let wrappedComponentRef;
  let resetStateSpy;
  beforeEach(() => {
    updateDeploymentStateSpy = sinon.spy();
    resetStateSpy = sinon.spy();

    exchangeStep = mount(
      <ExchangeStep
        wrappedComponentRef={inst => (wrappedComponentRef = inst)}
        updateDeploymentState={updateDeploymentStateSpy}
        resetState={resetStateSpy}
      />
    );
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ExchangeStep />, div);
  });

  it('should change exchangeApi state when select api', () => {
    const value = 'BIN';
    exchangeStep
      .find(Field)
      .first()
      .getElement()
      .props.onChange(value);
    expect(wrappedComponentRef.state.exchangeApi).to.equal(value);
  });
});
