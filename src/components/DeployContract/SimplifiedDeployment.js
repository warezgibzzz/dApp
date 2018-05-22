import { Col, Row, Steps } from 'antd';
import React, { Component } from 'react';

import StepAnimation from '../StepAnimation';
import showMessage from '../message';
import { DeployStep, ExpirationStep, ExchangeStep, PricingStep } from './Steps';

const Step = Steps.Step;

const parentColLayout = {
  lg: {
    span: 18
  },
  sm: {
    span: 22
  },
  xs: {
    span: 24
  }
};

/**
 * Component for Simplified Deployment of Contracts
 *
 */
class SimplifiedDeployment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      step: 0,
      transitionDirection: 'next',
      contractName: '',
      baseTokenAddress: '',
      priceFloor: '',
      priceCap: '',
      priceDecimalPlaces: '',
      qtyMultiplier: '',
      expirationTimeStamp: '',
      oracleDataSource: '',
      oracleQuery: ''
    };
  }

  toNextStep() {
    this.setState({
      step: this.state.step + 1,
      transitionDirection: 'next'
    });
  }

  toPrevStep() {
    this.setState({
      step: this.state.step - 1,
      transitionDirection: 'prev'
    });
  }

  onFailSubmit() {
    this.setState({
      step: 0,
      transitionDirection: 'prev'
    });
  }

  render() {
    const currentStep = this.state.step;
    const steps = [
      <ExchangeStep
        key="0"
        onNextClicked={this.toNextStep.bind(this)}
        updateDeploymentState={this.setState.bind(this)}
        {...this.state}
      />,

      <PricingStep
        key="1"
        onPrevClicked={this.toPrevStep.bind(this)}
        onNextClicked={this.toNextStep.bind(this)}
        updateDeploymentState={this.setState.bind(this)}
        isSimplified
        {...this.state}
      />,

      <ExpirationStep
        key="2"
        location={this.props.location}
        onPrevClicked={this.toPrevStep.bind(this)}
        onNextClicked={this.toNextStep.bind(this)}
        updateDeploymentState={this.setState.bind(this)}
        isSimplified
        {...this.state}
      />,

      <DeployStep
        key="3"
        deployContract={() => {
          this.props.onDeployContract(this.state);
        }}
        showErrorMessage={showMessage.bind(showMessage, 'error')}
        showSuccessMessage={showMessage.bind(showMessage, 'success')}
        onFailSubmit={this.onFailSubmit.bind(this)}
        loading={this.props.loading}
        contract={this.props.contract}
        error={this.props.error}
      />
    ];

    return (
      <div className="page">
        <Row type="flex" justify="center">
          <Col {...parentColLayout}>
            <Steps current={currentStep} style={{ marginBottom: '40px' }}>
              <Step title="Exchange" />
              <Step title="Pricing" />
              <Step title="Expiration" />
              <Step title="Deploy" />
            </Steps>
            <StepAnimation direction={this.state.transitionDirection}>
              {steps.filter((step, index) => currentStep === index)}
            </StepAnimation>
          </Col>
        </Row>
      </div>
    );
  }
}

export default SimplifiedDeployment;
