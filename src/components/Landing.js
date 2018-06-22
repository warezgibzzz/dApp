import React, { Component } from 'react';
import { Button, Col, Row } from 'antd';
import { Link } from 'react-router-dom';

// Images
import main from '../img/hero-illustration.svg';
import explore from '../img/explore-illustration.svg';
import test from '../img/test-illustration.svg';
import simulate from '../img/sim-illustration.svg';

import WelcomeMessage from './WelcomeMessage';
import CallToActionBanner from './CallToActionBanner';

// Styles
import '../less/Landing.less';

class LandingComponent extends Component {
  render() {
    return (
      <div id="landing">
        <Row type="flex" className="hero" align="middle">
          <Col xs={24} sm={24} md={10} lg={10} xl={10}>
            <div className="hero-text-container">
              <h1>Simplified Contract Deployment</h1>
              <p>
                Quickly deploy a MARKET Protocol Smart Contract for the first
                time
              </p>
              <Link to="/contract/deploy?mode=simplified">
                <Button type="primary" size="large">
                  Get Started
                </Button>
              </Link>
            </div>
          </Col>
          <Col span={14} className="hide-mobile">
            <div className="hero-image">
              <img alt="Header Illustration" src={main} />
            </div>
          </Col>
        </Row>
        <div className="features-container">
          <Row type="flex" align="middle">
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <div className="illustration-container">
                <img alt="Explore Contracts" src={explore} width="70%" />
              </div>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <div className="feature-text-container">
                <h2 className="feature-header">Explore Contracts</h2>
                <p className="feature-description">
                  Search, filter, and select from already deployed MARKET
                  Protocol Smart Contracts that meet your needs.
                </p>
                <Link to="/contract/explore">
                  <Button type="primary" size="large">
                    Get Started
                  </Button>
                </Link>
              </div>
            </Col>
          </Row>
          <Row type="flex" align="middle">
            <Col
              xs={24}
              sm={24}
              md={{ span: 12, push: 12 }}
              lg={{ span: 12, push: 12 }}
              xl={{ span: 12, push: 12 }}
            >
              <div className="illustration-container">
                <img alt="Test Queries" src={test} width="70%" />
              </div>
            </Col>
            <Col
              xs={24}
              sm={24}
              md={{ span: 12, pull: 12 }}
              lg={{ span: 12, pull: 12 }}
              xl={{ span: 12, pull: 12 }}
            >
              <div className="feature-text-container">
                <h2 className="feature-header">Test Queries</h2>
                <p className="feature-description">
                  Test your queries before you deploy, save gas & time with our
                  on-chain query testing contract.
                </p>
                <Link to="/test">
                  <Button type="primary" size="large">
                    Get Started
                  </Button>
                </Link>
              </div>
            </Col>
          </Row>
          <Row type="flex" align="middle">
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <div className="illustration-container sim">
                <img alt="Simulated Exchange" src={simulate} width="70%" />
              </div>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <div className="feature-text-container">
                <h2 className="feature-header">Simulated Exchange</h2>
                <p className="feature-description">
                  What is it like to trade a MARKET Protocol Smart Contract?
                  Find out here. Leaderboards for trading and competitions all
                  coming soon.
                </p>
                <Link to="/exchange">
                  <Button type="primary" size="large">
                    Get Started
                  </Button>
                </Link>
              </div>
            </Col>
          </Row>
        </div>

        <CallToActionBanner />

        <WelcomeMessage network={this.props.network} />
      </div>
    );
  }
}

export default LandingComponent;
