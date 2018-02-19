import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import DeployContractForm from '../../../src/components/DeployContract/DeployContractForm';
import QuickDeployment from '../../../src/components/DeployContract/QuickDeployment';
import GuidedDeployment from '../../../src/components/DeployContract/GuidedDeployment';

describe('DeployContractForm', () => {
  let deployContractForm;
  let onDeployContractSpy;
  beforeEach(() => {
    onDeployContractSpy = sinon.spy();
    const props = {
      location: {},
      onDeployContract: onDeployContractSpy
    };
    deployContractForm = shallow(<DeployContractForm {...props}/>);
  });
  
  it('should render QuickDeployment by default', () => {
    deployContractForm.setProps({
      location: {
        search: ""
      }
    });
    expect(deployContractForm.find(QuickDeployment)).to.have.length(1);
  });

  it('should render QuickDeployment if mode is quick', () => {
    deployContractForm.setProps({
      location: {
        search: "?mode=quick"
      }
    });
    expect(deployContractForm.find(QuickDeployment)).to.have.length(1);
  });

  it('should deployContract when QuickDeployment.props.onDeployContract is invoked', () => {
    deployContractForm.find(QuickDeployment).props().onDeployContract({});
    expect(onDeployContractSpy).to.have.property('callCount', 1);
  });

  it('should render GuidedDeployment if mode is guided', () => {
    deployContractForm.setProps({
      location: {
        search: "?mode=guided"
      }
    });
    expect(deployContractForm.find(GuidedDeployment)).to.have.length(1);
  });

  it('should deployContract when GuidedDeployment.props.onDeployContract is invoked', () => {
    deployContractForm.setProps({
      location: {
        search: "?mode=guided"
      }
    });
    deployContractForm.find(GuidedDeployment).props().onDeployContract({});
    expect(onDeployContractSpy).to.have.property('callCount', 1);
  });

  it('should update route with switchMode parameters', () => {
    const navSpy = sinon.spy();
    deployContractForm.setProps({
      history: {
        push: navSpy
      }
    });
    deployContractForm.find(QuickDeployment).props().switchMode('guided');
    expect(navSpy).to.have.property('callCount', 1);
    // TODO: Test the actuall parameters pushed to history stack.
  });
});
