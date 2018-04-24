import React from 'react';
import { Steps } from 'antd';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import {
  NameContractStep,
  PricingStep,
  ExpirationStep,
  DataSourceStep,
  DeployStep
} from '../../../src/components/DeployContract/Steps';
import GuidedDeployment from '../../../src/components/DeployContract/GuidedDeployment';

describe('GuidedDeployment', () => {
  const nameStep = 0;
  const dataSourceStep = 1;
  const pricingStep = 2;
  const expirationStep = 3;
  const deployStep = 4;

  let guidedDeployment;
  let onDeployContractSpy;
  beforeEach(() => {
    onDeployContractSpy = sinon.spy();
    guidedDeployment = shallow(<GuidedDeployment onDeployContract={onDeployContractSpy}/>);
  });

  it('should render 5 steps', () => {
    expect(guidedDeployment.find(Steps.Step)).to.have.length(5);
  });

  it('should render NameContractStep default', () => {
    expect(guidedDeployment.find(NameContractStep)).to.have.length(1);
  });

  it('should render NameContractStep', () => {
    guidedDeployment.setState({ step: nameStep });
    expect(guidedDeployment.find(NameContractStep)).to.have.length(1);
  });

  it('should move to prev step on PricingStep.onPrevClicked', () => {
    guidedDeployment.setState({ step: pricingStep });
    guidedDeployment.find(PricingStep).simulate('prevClicked');
    expect(guidedDeployment.state('step')).to.equal(pricingStep - 1);
  });

  it('should move to next step on PricingStep.onNextClicked', () => {
    guidedDeployment.setState({ step: pricingStep });
    guidedDeployment.find(PricingStep).simulate('nextClicked');
    expect(guidedDeployment.state('step')).to.equal(pricingStep + 1);
  });

  it('should render ExpirationStep', () => {
    guidedDeployment.setState({ step: expirationStep });
    expect(guidedDeployment.find(ExpirationStep)).to.have.length(1);
  });

  it('should render DataSourceStep', () => {
    guidedDeployment.setState({ step: dataSourceStep });
    expect(guidedDeployment.find(DataSourceStep)).to.have.length(1);
  });

  it('should reset to inital step', () => {
    guidedDeployment.setState({step: deployStep});
    guidedDeployment.setProps({error: "Without data"});
    guidedDeployment.find(DeployStep).simulate('failSubmit');
    expect(guidedDeployment.state('step')).to.equal(0);
  });

  it('should called onDeployContract when DeployStep.deployContract', () => {
    guidedDeployment.setState({ step: deployStep });
    guidedDeployment.find(DeployStep).props().deployContract();
    expect(onDeployContractSpy).to.have.property('callCount', 1);
  });
});
