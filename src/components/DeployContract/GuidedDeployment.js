import React, { Component } from 'react';
import { Row, Col, Steps } from 'antd';

import StepAnimation from '../StepAnimation';
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
      transitionDirection: 'next',
      contractName: '',
      baseTokenAddress: '',
      priceFloor: '',
      priceCap: '',
      priceDecimalPlaces: '',
      qtyMultiplier: '',
      expirationTimeStamp: '',
      oracleDataSource: '',
      oracleQuery: '',
      oracleQueryRepeatSeconds: ''
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

  render() {
    const currentStep = this.state.step;
    const initialValues = this.props.initialValues;
    const steps = [
      <NameContractStep 
        key="0"
        onNextClicked={this.toNextStep.bind(this)}
        updateDeploymentState={this.setState.bind(this)}
        {...this.state} />,

      <PricingStep 
        key="1"
        onPrevClicked={this.toPrevStep.bind(this)}
        onNextClicked={this.toNextStep.bind(this)}
        updateDeploymentState={this.setState.bind(this)} 
        {...this.state} />,

      <ExpirationStep
        key="2"
        onPrevClicked={this.toPrevStep.bind(this)}
        onNextClicked={this.toNextStep.bind(this)}
        updateDeploymentState={this.setState.bind(this)} 
        {...this.state} />,

      <DataSourceStep
        key="3"
        onPrevClicked={this.toPrevStep.bind(this)}
        onNextClicked={this.toNextStep.bind(this)}
        updateDeploymentState={this.setState.bind(this)}
        initialValues={initialValues}
        {...this.state} />,

      <DeployStep
        key="4"
        deployContract={() => { this.props.onDeployContract(this.state); }}
        loading={this.props.loading}
        contract={this.props.contract}
        error={this.props.error} />
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
          <StepAnimation
            direction={this.state.transitionDirection}>
            {steps.filter((step, index) => currentStep === index )}
          </StepAnimation>
        </Col>
      </Row>
  );
  }
}

export default GuidedDeployment;