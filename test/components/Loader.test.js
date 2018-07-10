import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';

import Loader from '../../src/components/Loader';

describe('Loader', () => {
  it('should be visible', () => {
    const loader = mount(<Loader />);
    expect(loader.find('.loader')).to.have.length(1);
  });

  it('should be visible with message', () => {
    const loader = mount(<Loader message="test" />);

    expect(loader.props().message).to.equals('test');
  });
});
