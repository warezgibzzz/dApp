import React, { Component } from 'react';
import { Row, Col, Steps } from 'antd';

import { NameContractStep, PricingStep, ExpirationStep, DataSourceStep, DeployStep } from './Steps';

const Step = Steps.Step;

const parentColLayout = {
  lg: {
    span: 16
  },
  sm: {
    span: 24
  },
  xs: {
    span: 24
  }
};

/**
 * Component for Guided Deployment of Contracts
 * 
 */
class GuidedDeployment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      step: 0,
    };
  }

  toNextStep() {
    this.setState({
      step: this.state.step + 1
    });
  }

  toPrevStep() {
    this.setState({
      step: this.state.step - 1
    });
  }

  render() {
    const currentStep = this.state.step;
    const steps = [
      <NameContractStep 
        key="0"
        onNextClicked={this.toNextStep.bind(this)}/>,

      <PricingStep 
        key="1"
        onPrevClicked={this.toPrevStep.bind(this)}
        onNextClicked={this.toNextStep.bind(this)} />,

      <ExpirationStep
        key="2"
        onPrevClicked={this.toPrevStep.bind(this)}
        onNextClicked={this.toNextStep.bind(this)} />,

      <DataSourceStep
        key="3"
        onPrevClicked={this.toPrevStep.bind(this)}
        onNextClicked={this.toNextStep.bind(this)} />,

      <DeployStep
        key="4" />
    ];

    return (
      <Row type="flex" justify="center">
        <Col {...parentColLayout}>
          <Steps current={currentStep}>
            <Step title="Name"/>
            <Step title="Pricing" />
            <Step title="Expiration" />
            <Step title="Data Source" />
            <Step title="Deploy" />
          </Steps>
          <br/>
          {steps.filter((step, index) => currentStep === index )}
        </Col>
      </Row>
  );
  }
}

export default GuidedDeployment;