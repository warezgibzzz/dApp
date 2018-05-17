import React, { Component } from 'react';
import { Button, Modal } from 'antd';

export const title = 'Welcome to the official MARKET Protocol dApp';

class WelcomeMessage extends Component {
  state = {
    visible: localStorage
      ? localStorage.getItem('showWelcomeMessage') === 'true'
      : true
  };

  setIsVisited = e => {
    this.setState({
      visible: false
    });

    if (localStorage) {
      localStorage.setItem('showWelcomeMessage', false);
    }
  };

  render() {
    return (
      <Modal
        title={title}
        visible={this.state.visible}
        onCancel={this.setIsVisited}
        footer={[
          null,
          <Button key="submit" type="primary" onClick={this.setIsVisited}>
            Proceed to dApp
          </Button>
        ]}
      >
        <ul>
          <p>
            <b>Instructions :</b>
          </p>
          <li>
            Please install MetaMask for your browser, available{' '}
            <span>
              <a
                href="https://metamask.io/"
                target="_blank"
                rel="noopener noreferrer"
              >
                here
              </a>.
            </span>
          </li>
          <li>
            Once MetaMask is installed select the <b>"Rinkeby Test Network"</b>{' '}
            in MetaMask and restart your browser.
          </li>
          <li>
            You will also need rinkeby test{' '}
            <span>
              <a
                href="https://faucet.rinkeby.io/"
                target="_blank"
                rel="noopener noreferrer"
              >
                ETH
              </a>. If you need help{' '}
              <span>
                <a
                  href="https://www.youtube.com/watch?v=YHlCPyaKwuk"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  this video tutorial
                </a>{' '}
                is a good place to start.
              </span>
            </span>
          </li>
        </ul>
      </Modal>
    );
  }
}

export default WelcomeMessage;
