import React from 'react';
import { mount } from 'enzyme';

import QuickDeployment from '../../../src/components/DeployContract/QuickDeployment';

describe('QuickDeployment', () => {
  it('should render', () => {
    mount(<QuickDeployment initialValues={{}}/>);
  });
});
