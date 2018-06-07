import { Col, Row, Steps } from 'antd';
import React, { Component } from 'react';

import StepAnimation from '../StepAnimation';
import { DeployStep, ExpirationStep, ExchangeStep, PricingStep } from './Steps';

import showMessage from '../message';
import { getCollateralTokenAddress } from '../../util/utils';

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
      collateralTokenAddress: '',
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
    const { gas, network } = this.props;

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
        isSimplified={true}
        {...this.state}
      />,

      <ExpirationStep
        key="2"
        gas={gas}
        location={this.props.location}
        onPrevClicked={this.toPrevStep.bind(this)}
        onNextClicked={this.toNextStep.bind(this)}
        updateDeploymentState={this.setState.bind(this)}
        isSimplified={true}
        {...this.state}
      />,

      <DeployStep
        key="3"
        deployContract={() => {
          // fix decimal points.
          // this simply assumes the decimal places of the original price.
          // Since we limit the floor-cap range to 45% to 155%, this is a good estimate
          // and we shouldn't loose much in terms of precission
          this.setState(
            {
              collateralTokenAddress: getCollateralTokenAddress(network),
              priceFloor: Math.round(
                this.state.priceFloorSimplified *
                  10 ** this.state.priceDecimalPlaces
              ),
              priceCap: Math.round(
                this.state.priceCapSimplified *
                  10 ** this.state.priceDecimalPlaces
              )
            },
            () => this.props.onDeployContract(this.state)
          );
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
