import React from 'react';
import { mount } from 'enzyme';

import Splash from '../src/Splash';

describe('Splash', () => {
  it('should render successfully', () => {
    mount(<Splash />);
  });
});