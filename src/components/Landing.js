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

// Styles
import './Landing.css';

class Landing extends Component {
  render() {
    return (
      <div>
        <Row type="flex" className="hero" align="middle">
          <Col span={10}>
            <div className="hero-text">
              <h1>Deploy Contracts - Guided</h1>
              <h4>Step by step guide for first time MARKET Smart Contract deployment</h4>
              <Button type="primary" size="large"> Get Started </Button>
            </div>
          </Col>
          <Col span={14}>
            <div className="hero-image">
              <img alt="Header Illustration" src={main} width="600"/>
            </div>
          </Col>
        </Row>
        <Row type="flex" align="middle" id="explore-section" className="feature-section">
          <Col span={14}>
            <div className="feature-image">
              <img alt="Explore contracts Illustration" src={explore} width="90%"/>
            </div>
          </Col>
          <Col span={6}>
            <div className="feature-text-container">
              <img alt="Explore contracts icons" className="feature-icons" src={exploreIcons}/>
              <h1 className="feature-main-text">Explore Contracts</h1>
              <h4 className="feature-sub-text">Search, filter, and select from already deployed MARKET Smart Contracts that meet your needs.</h4>
              <Button type="primary" size="large">Get Started <Icon type="right" /></Button>
            </div>
          </Col>
        </Row>
        <Row type="flex" justify="end" align="middle" id="test-section" className="feature-section">
          <Col span={6}>
            <div className="feature-text-container">
              <img alt="Test Queries icons" className="feature-icons" src={testIcons}/>
              <h1 className="feature-main-text">Test Queries</h1>
              <h4 className="feature-sub-text">Test your queries before you deploy, save gas and time with our on-chain query testing contract.</h4>
              <Button type="primary" size="large">Get Started <Icon type="right" /></Button>
            </div>
          </Col>
          <Col span={14} style={{textAlign: 'right'}}>
            <div className="feature-image">
              <img alt="Test Queries Illustration" src={test} width="90%"/>
            </div>
          </Col>
        </Row>
        <Row type="flex" align="middle" id="simulated-section" className="feature-section">
          <Col span={14}>
            <div className="feature-image">
              <img alt="Simulated exchange Illustration" src={simulate} width="90%"/>
            </div>
          </Col>
          <Col span={6}>
            <div className="feature-text-container">
              <img alt="Simulated exchange icons" className="feature-icons" src={simulateIcons}/>
              <h1 className="feature-main-text">Simulated Exchange</h1>
              <h4 className="feature-sub-text">What is it like to trade a MARKET Smart Contract? Find out here. Leaderboards for trading and competitions all coming soon.</h4>
              <Button type="primary" size="large">Get Started <Icon type="right" /></Button>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Landing;
