import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import DeployContractForm from '../../../src/components/DeployContract/DeployContractForm';
import QuickDeployment from '../../../src/components/DeployContract/QuickDeployment';
import GuidedDeployment from '../../../src/components/DeployContract/GuidedDeployment';

describe('DeployContractForm', () => {
  let deployContractForm;

  beforeEach(() => {
    const props = {
      location: {}
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

  it('should render GuidedDeployment if mode is guided', () => {
    deployContractForm.setProps({
      location: {
        search: "?mode=guided"
      }
    });
    expect(deployContractForm.find(GuidedDeployment)).to.have.length(1);
  });
});
