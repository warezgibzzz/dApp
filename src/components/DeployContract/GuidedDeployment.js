import React, { Component } from 'react';
import { Row, Col, Steps } from 'antd';

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
 * Component for GuidedDeployment
 * 
 */
class GuidedDeployment extends Component {

  render() {
    const currentStep = 0
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
          
        </Col>
      </Row>
  );
  }
}

export default GuidedDeployment;