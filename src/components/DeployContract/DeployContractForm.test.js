import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import DeployContractForm from './DeployContractForm';
import QuickDeployment from './QuickDeployment';
import GuidedDeployment from './GuidedDeployment';

describe('DeployContractForm', () => {
  let deployContractForm;

  beforeEach(() => {
    const props = {
      location: {}
    }
    deployContractForm = shallow(<DeployContractForm {...props}/>)
  });
  
  it('should render QuickDeployment by default', () => {
    deployContractForm.setProps({
      location: {
        search: ""
      }
    })
    expect(deployContractForm.find(QuickDeployment)).to.have.length(1);
  })

  it('should render QuickDeployment if mode is quick', () => {
    deployContractForm.setProps({
      location: {
        search: "?mode=quick"
      }
    })
    expect(deployContractForm.find(QuickDeployment)).to.have.length(1);
  })

  it('should render GuidedDeployment if mode is guided', () => {
    deployContractForm.setProps({
      location: {
        search: "?mode=guided"
      }
    })
    expect(deployContractForm.find(GuidedDeployment)).to.have.length(1);
  })
})
