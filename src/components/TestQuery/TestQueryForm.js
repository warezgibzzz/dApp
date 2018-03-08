import { Col, Row, Steps } from 'antd';
import qs from 'query-string';
import React, { Component } from 'react';

import StepAnimation from '../StepAnimation';
import showMessage from '../message';
import { AboutOraclesStep, QueryResultStep, SelectDataSourceStep, SetQueryStep } from './Steps';


const Step = Steps.Step;

const parentColLayout = {
  lg: {
    span: 16
  },
  sm: {
    span: 22
  },
  xs: {
    span: 24
  }
};

const message = (network, hash) => {
  let message = 'Transaction has been submitted: ';

  switch(network) {
    case 'rinkeby': 
      message = message + `https://rinkeby.etherscan.io/tx/${hash}`;
      break;
    case 'mainnet':
      message = message + `https://etherscan.io/tx/${hash}`;
      break;
    case 'unknown':
      message = message + `${hash}`;
      break;
    default:
      message = 'Transaction has been submitted';
  }

  return message;
};

class TestQueryForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      step: 0,
      transitionDirection: 'next',
      oracleDataSource: 'URL',
      oracleQuery: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.loading && !nextProps.loading) {
      if(nextProps.error) {
        // We had an error
        showMessage('error', `There was an error deploying the contract: ${nextProps.error}`, 8);
      }
    }

    if (this.props.transaction !== nextProps.transaction) {
        showMessage('info', message(this.props.network, nextProps.transaction), 8);
    }
  }

  onInputChange(event) {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  onDataSourceChange(dataSources) {
    this.setState({
      oracleDataSource: dataSources
    });
  }

  onQueryChange(query) {
    this.setState({
      oracleQuery: query
    });
  }

  onQuerySubmit() {
    this.toNextStep();
    this.props.onTestQuery(this.state);
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

  navigateToDeployContract() {
    const queryParams = {
      oracleDataSource: this.state.oracleDataSource,
      oracleQuery: this.state.oracleQuery
    };

    this.props.history.push({
      pathname: '/contract/deploy',
      search: `?${qs.stringify(queryParams)}`
    });
  }

  render() {
    const currentStep = this.state.step;
    const steps = [
      <AboutOraclesStep 
        key="0"
        onNextClicked={this.toNextStep.bind(this)} />,

      <SelectDataSourceStep 
        key="1"
        dataSource={this.state.oracleDataSource} 
        onChange={this.onDataSourceChange.bind(this)} 
        onPrevClicked={this.toPrevStep.bind(this)}
        onNextClicked={this.toNextStep.bind(this)} />,

      <SetQueryStep
        key="2"
        dataSource={this.state.oracleDataSource}
        onPrevClicked={this.toPrevStep.bind(this)}
        onChange={this.onQueryChange.bind(this)}
        onSubmit={this.onQuerySubmit.bind(this)} />,

      <QueryResultStep
        key="3"
        loading={this.props.loading}
        result={this.props.results}
        error={this.props.error} 
        onPrevClicked={this.toPrevStep.bind(this)}
        onCreateContractClicked={this.navigateToDeployContract.bind(this)} />,
    ];
    
    return (
      <div class="page">
        <Row type="flex" justify="center">
          <Col {...parentColLayout}>
            <Steps current={currentStep} style={{marginBottom: '40px'}}>
              <Step title="Introduction"/>
              <Step title="Oracle Data Source" />
              <Step title="Oracle Query" />
              <Step title="Result" />
            </Steps>
            <StepAnimation 
              direction={this.state.transitionDirection}>
              {steps.filter((step, index) => currentStep === index )[0]}
            </StepAnimation>
          </Col>
        </Row>
      </div>
    );
  }
}

export default TestQueryForm;
