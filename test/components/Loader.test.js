import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';

import Loader from '../../src/components/Loader';

describe('Loader', () => {
  it('should be visible with loading set', () => {
    const loader = mount(<Loader loading/>);
    expect(loader.find('div').prop('style').display).to.not.equal('none');
  });

  it('should not be visible', () => {
    const loader = mount(<Loader />);
    expect(loader.find('div').prop('style').display).to.equal('none');
  });
});