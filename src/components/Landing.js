import React, { Component } from 'react';
import { Button, Col, Icon, Row } from 'antd';

// Images
import main from '../img/header-illustration.svg';
import explore from '../img/explore-contracts.svg';
import test from '../img/test-queries.svg';
import simulate from '../img/simulated-exchange.svg';
import exploreIcons from '../img/explore-icons.svg';
import testIcons from '../img/test-icons.svg';
import simulateIcons from '../img/simulated-icons.svg';

import WelcomeMessage from './WelcomeMessage';

// Styles
import '../less/Landing.less';

class Landing extends Component {
  state = {
    isVisited: false,
  };

  handleSetIsVisited = () => {
    this.setState({ isVisited: true });
  }
  render() {
    return (
      <div>
        <Row type="flex" className="hero" align="middle">
          <Col xs={20} sm={20} md={10} lg={10} xl={10}>
            <div className="hero-text">
              <h1>Guided Contract Deployment</h1>
              <h4>
                Step by step guide for first time MARKET Smart Contract
                deployment
              </h4>
              <Button type="primary" size="large">
                <a href="/contract/deploy?mode=guided">
                  Get Started <Icon type="right" />
                </a>
              </Button>
            </div>
          </Col>
          <Col span={14} className="hide-mobile">
            <div className="hero-image">
              <img alt="Header Illustration" src={main} width="600" />
            </div>
          </Col>
        </Row>
        <Row
          type="flex"
          align="middle"
          id="explore-section"
          className="feature-section"
        >
          <Col xs={22} sm={22} md={14} lg={14} xl={14}>
            <div className="feature-image">
              <img
                alt="Explore contracts Illustration"
                src={explore}
                width="90%"
              />
            </div>
          </Col>
          <Col xs={22} sm={22} md={10} lg={10} xl={6}>
            <div className="feature-text-container">
              <img
                alt="Explore contracts icons"
                className="feature-icons"
                src={exploreIcons}
              />
              <h1 className="feature-main-text">Explore Contracts</h1>
              <h4 className="feature-sub-text">
                Search, filter, and select from already deployed MARKET Smart
                Contracts that meet your needs.
              </h4>
              <Button type="primary" size="large">
                <a href="/contract/explorer">
                  Get Started <Icon type="right" />
                </a>
              </Button>
            </div>
          </Col>
        </Row>
        <Row
          type="flex"
          align="middle"
          id="test-section"
          className="feature-section"
        >
          <Col
            xs={24}
            sm={24}
            md={{ span: 14, push: 10 }}
            lg={{ span: 14, push: 10 }}
            xl={{ span: 14, push: 10 }}
            style={{ textAlign: 'right' }}
          >
            <div className="feature-image">
              <img alt="Test Queries Illustration" src={test} width="90%" />
            </div>
          </Col>
          <Col
            xs={24}
            sm={24}
            md={{ span: 10, pull: 12 }}
            lg={{ span: 10, pull: 12 }}
            xl={{ span: 6, pull: 10 }}
          >
            <div className="feature-text-container">
              <img
                alt="Test Queries icons"
                className="feature-icons"
                src={testIcons}
              />
              <h1 className="feature-main-text">Test Queries</h1>
              <h4 className="feature-sub-text">
                Test your queries before you deploy, save gas and time with our
                on-chain query testing contract.
              </h4>
              <Button type="primary" size="large">
                <a href="/test">
                  Get Started <Icon type="right" />
                </a>
              </Button>
            </div>
          </Col>
        </Row>
        <Row
          type="flex"
          align="middle"
          id="simulated-section"
          className="feature-section"
        >
          <Col xs={22} sm={22} md={14} lg={14} xl={14}>
            <div className="feature-image">
              <img
                alt="Simulated exchange Illustration"
                src={simulate}
                width="90%"
              />
            </div>
          </Col>
          <Col xs={22} sm={22} md={10} lg={10} xl={6}>
            <div className="feature-text-container">
              <img
                alt="Simulated exchange icons"
                className="feature-icons"
                src={simulateIcons}
              />
              <h1 className="feature-main-text">Simulated Exchange</h1>
              <h4 className="feature-sub-text">
                What is it like to trade a MARKET Smart Contract? Find out here.
                Leaderboards for trading and competitions all coming soon.
              </h4>
              <Button type="primary" size="large">
                <a href="/exchange">
                  Get Started <Icon type="right" />
                </a>
              </Button>
            </div>
          </Col>
        </Row>
        { !this.state.isVisited
          ? 
          <WelcomeMessage setIsVisited={this.handleSetIsVisited} />
          :
          ''
        }
      </div>
    );
  }
}

export default Landing;
