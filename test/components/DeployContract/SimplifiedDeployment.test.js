import React from 'react';
import { Steps } from 'antd';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import {
  PricingStep,
  ExpirationStep,
  ExchangeStep,
  DeployStep,
  GasStep
} from '../../../src/components/DeployContract/Steps';
import SimplifiedDeployment from '../../../src/components/DeployContract/SimplifiedDeployment';

describe('SimplifiedDeployment', () => {
  const exchangeStep = 0;
  const pricingStep = 1;
  const expirationStep = 2;
  const gasStep = 3;
  const deployStep = 4;

  let simplifiedDeployment;
  let onDeployContractSpy;
  beforeEach(() => {
    onDeployContractSpy = sinon.spy();
    simplifiedDeployment = shallow(
      <SimplifiedDeployment onDeployContract={onDeployContractSpy} />
    );
  });

  it('should render 4 steps', () => {
    expect(simplifiedDeployment.find(Steps.Step)).to.have.length(5);
  });

  it('should render ExchangeStep default', () => {
    expect(simplifiedDeployment.find(ExchangeStep)).to.have.length(1);
  });

  it('should render ExchangeStep', () => {
    simplifiedDeployment.setState({ step: exchangeStep });
    expect(simplifiedDeployment.find(ExchangeStep)).to.have.length(1);
  });

  it('should move to prev step on PricingStep.onPrevClicked', () => {
    simplifiedDeployment.setState({ step: pricingStep });
    simplifiedDeployment.find(PricingStep).simulate('prevClicked');
    expect(simplifiedDeployment.state('step')).to.equal(pricingStep - 1);
  });

  it('should move to next step on PricingStep.onNextClicked', () => {
    simplifiedDeployment.setState({ step: pricingStep });
    simplifiedDeployment.find(PricingStep).simulate('nextClicked');
    expect(simplifiedDeployment.state('step')).to.equal(pricingStep + 1);
  });

  it('should render ExpirationStep', () => {
    simplifiedDeployment.setState({ step: expirationStep });
    expect(simplifiedDeployment.find(ExpirationStep)).to.have.length(1);
  });

  it('should render GasStep', () => {
    simplifiedDeployment.setState({ step: gasStep });
    expect(simplifiedDeployment.find(GasStep)).to.have.length(1);
  });

  it('should reset to inital step', () => {
    simplifiedDeployment.setState({ step: deployStep });
    simplifiedDeployment.setProps({ error: 'Without data' });
    simplifiedDeployment.find(DeployStep).simulate('failSubmit');
    expect(simplifiedDeployment.state('step')).to.equal(0);
  });

  it('should called onDeployContract when DeployStep.deployContract', () => {
    simplifiedDeployment.setState({ step: deployStep });
    simplifiedDeployment
      .find(DeployStep)
      .props()
      .deployContract();
    expect(onDeployContractSpy).to.have.property('callCount', 1);
  });
});
