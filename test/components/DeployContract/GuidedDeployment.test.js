import React from 'react';
import { Steps } from 'antd';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import GuidedDeployment from '../../../src/components/DeployContract/GuidedDeployment';

describe('GuidedDeployment', () => {
  let guidedDeployment;

  beforeEach(() => {
    guidedDeployment = shallow(<GuidedDeployment />);
  });
  
  it('should render 5 steps', () => {
    expect(guidedDeployment.find(Steps.Step)).to.have.length(5);
  });
});
