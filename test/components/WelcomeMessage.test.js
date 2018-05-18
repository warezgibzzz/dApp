import React from 'react';
import { mount, render } from 'enzyme';
import { expect } from 'chai';

import { Modal, Icon, Tag } from 'antd';

import WelcomeMessage, { title } from '../../src/components/WelcomeMessage';
import ReactDOM from 'react-dom';

describe('WelcomeMessage', () => {
  let welcomeMessage;

  beforeEach(() => {
    welcomeMessage = mount(<WelcomeMessage />);
  });

  function $$(className) {
    return document.body.querySelectorAll(className);
  }

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<WelcomeMessage />, div);
  });

  it('should have exact title', () => {
    expect(welcomeMessage.find(Modal).prop('title')).to.equal(title);
  });

  it('should be visible true', () => {
    welcomeMessage.setState({ visible: true });
    expect(welcomeMessage.find(Modal).prop('visible')).to.equal(true);
  });

  it('click proceed to dApp should hide the modal', () => {
    $$('.ant-btn-primary')[0].click();
    expect(welcomeMessage.find(Modal).prop('visible')).to.equal(false);
  });

  describe('should render a label showing the network status', () => {
    it('should render a label with green text and check Icon when connected to rinkeby', () => {
      welcomeMessage.setState({ visible: true });
      welcomeMessage.setProps({ network: 'rinkeby' });
      expect(welcomeMessage.find('p.network-status').length).to.equal(1);
      expect(
        welcomeMessage.find('p.network-status').props().style.color
      ).to.equal('#00FFE2');
      expect(welcomeMessage.find(Icon).props().type).to.equal('check-circle-o');
    });
    it('should render a label with red text and "X" Icon when NOT connected to rinkeby', () => {
      welcomeMessage.setState({ visible: true });
      welcomeMessage.setProps({ network: 'unknown' });
      expect(welcomeMessage.find('p.network-status').length).to.equal(1);
      expect(
        welcomeMessage.find('p.network-status').props().style.color
      ).to.equal('#FF0A0A');
      expect(welcomeMessage.find(Icon).props().type).to.equal('close-circle-o');
    });
  });
});
