import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';

import {Modal} from 'antd';

import WelcomeMessage from '../../src/components/WelcomeMessage';


describe('WelcomeMessage' , () => {
  it('should have exact okText' , () => {
    const modalOkText = mount(<WelcomeMessage />);
    expect(modalOkText.find(Modal).prop('okText')).to.equal('Proceed to dApp');
  
});

it('should have exact title', () => {
  const modalOkText = mount(<WelcomeMessage/>);
  expect(modalOkText.find(Modal).prop('title')).to.equal('Welcome To MarketProtocol.io');

});
});