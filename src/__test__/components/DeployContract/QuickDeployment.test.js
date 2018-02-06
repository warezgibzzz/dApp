import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';

import QuickDeployment from '../../../components/DeployContract/QuickDeployment';

describe('QuickDeployment', () => {
  let quickDeployment;
  
  it('should render', () => {
    quickDeployment = mount(<QuickDeployment />);
  });
});
