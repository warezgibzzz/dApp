import React, { Component } from 'react';
import { Modal } from 'antd';

//import metamaskLogo from '../img/metamask-image-tiny.png';

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
        title="Welcome to the official MARKET Protocol dApp"
        visible={this.state.visible}
        onOk={this.setIsVisited}
        onCancel={this.setIsVisited}
        okText="Proceed to dApp"
      >
        <ul>
          <p>
            <b>Instructions :</b>
          </p>
          <li>
            Please install MetaMask for your browser. Available{' '}
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
          {/*<li>*/}
          {/*<span>*/}
          {/*Open MetaMask by clicking the fox{' '}*/}
          {/*<img src={metamaskLogo} alt="MetaMask" width="8%" /> at the*/}
          {/*top-right of your browser.*/}
          {/*</span>*/}
          {/*</li>*/}
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
              </a>.
            </span>
          </li>
          <li>
            If you need help with getting test ETH check out{' '}
            <span>
              <a
                href="https://www.youtube.com/watch?v=YHlCPyaKwuk"
                target="_blank"
                rel="noopener noreferrer"
              >
                this video tutorial
              </a>.
            </span>
          </li>
        </ul>
      </Modal>
    );
  }
}

export default WelcomeMessage;
