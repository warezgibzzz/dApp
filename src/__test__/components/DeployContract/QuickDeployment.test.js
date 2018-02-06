import React from 'react';
import { mount } from 'enzyme';

import QuickDeployment from '../../../components/DeployContract/QuickDeployment';

describe('QuickDeployment', () => {
  it('should render', () => {
    mount(<QuickDeployment />);
  });
});
