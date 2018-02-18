import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import StepAnimation from '../../src/components/StepAnimation';

describe('StepAnimation', () => {
  it('should set next as default transition direction', () => {
    const wrapper = shallow(<StepAnimation />);
    const transitionDirection = 'next-enter';
    expect(wrapper.find(ReactCSSTransitionGroup).prop('transitionName').enter).to.equal(transitionDirection);
  });

  it('should throw if set direction is invalid', () => {
    expect(() => {
      shallow(<StepAnimation direction="forward" />);
    }).to.throw();
  });
});