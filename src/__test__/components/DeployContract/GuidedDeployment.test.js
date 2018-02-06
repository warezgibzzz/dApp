import React from 'react';
import ReactDOM from 'react-dom';
import { Steps } from 'antd';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import GuidedDeployment from '../../../components/DeployContract/GuidedDeployment';

describe('GuidedDeployment', () => {
  let guidedDeployment;

  beforeEach(() => {
    guidedDeployment = shallow(<GuidedDeployment />);
  });
  
  it('should render 4 steps', () => {
    expect(guidedDeployment.find(Steps.Step)).to.have.length(5);
  });
});
