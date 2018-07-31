import { Col, Row, Steps } from 'antd';
import qs from 'query-string';
import React, { Component } from 'react';

import TestQuerySuccess from './TestQuerySuccess';
import StepAnimation from '../StepAnimation';
import showMessage from '../message';
import {
  AboutOraclesStep,
  QueryResultStep,
  SelectDataSourceStep,
  SetQueryStep
} from './Steps';

const Step = Steps.Step;

const parentColLayout = {
  xxl: {
    span: 10
  },
  xl: {
    span: 12
  },
  lg: {
    span: 14
  },
  md: {
    span: 18
  },
  xs: {
    span: 24
  }
};

class TestQueryForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      step: 0,
      transitionDirection: 'next',
      oracleDataSource: 'URL',
      oracleQuery: '',
      gas: props.gas,
      gasPrice: 2
    };
  }

  componentDidMount() {
    this.props.getGasEstimate();
  }

  componentDidUpdate(prevProps) {
    if (this.props.loading && !prevProps.loading) {
      if (this.props.error) {
        // We had an error
        showMessage(
          'error',
          `There was an error deploying the contract: ${this.props.error}`,
          8
        );
      }
    }

    if (this.props.transaction !== prevProps.transaction) {
      showMessage(
        'info',
        TestQuerySuccess({
          network: this.props.network,
          txHash: this.props.transaction
        }),
        8
      );
    }

    if (this.props.gas !== prevProps.gas) {
      this.setState({ gas: this.props.gas });
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

  onUpdateGasLimit(gas) {
    this.setState({ gas });
  }

  onUpdateGasPrice(price) {
    this.setState({ gasPrice: price });
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
      <AboutOraclesStep key="0" onNextClicked={this.toNextStep.bind(this)} />,

      <SelectDataSourceStep
        key="1"
        dataSource={this.state.oracleDataSource}
        onChange={this.onDataSourceChange.bind(this)}
        onPrevClicked={this.toPrevStep.bind(this)}
        onNextClicked={this.toNextStep.bind(this)}
      />,

      <SetQueryStep
        key="2"
        dataSource={this.state.oracleDataSource}
        location={this.props.location}
        network={this.props.network}
        gas={this.props.gas}
        onUpdateGasLimit={this.onUpdateGasLimit.bind(this)}
        onUpdateGasPrice={this.onUpdateGasPrice.bind(this)}
        onPrevClicked={this.toPrevStep.bind(this)}
        onChange={this.onQueryChange.bind(this)}
        onSubmit={this.onQuerySubmit.bind(this)}
      />,

      <QueryResultStep
        key="3"
        loading={this.props.loading}
        result={this.props.results}
        error={this.props.error}
        onPrevClicked={this.toPrevStep.bind(this)}
        onCreateContractClicked={this.navigateToDeployContract.bind(this)}
        onFailSubmit={this.onFailSubmit.bind(this)}
      />
    ];

    return (
      <div className="page">
        <Row type="flex" justify="center" style={{ margin: '20px 0' }}>
          <Col span={18}>
            <Steps current={currentStep} style={{ marginBottom: '40px' }}>
              <Step title="Introduction" />
              <Step title="Oracle Data Source" />
              <Step title="Oracle Query" />
              <Step title="Result" />
            </Steps>
          </Col>
        </Row>
        <Row type="flex" justify="center">
          <Col {...parentColLayout}>
            <StepAnimation direction={this.state.transitionDirection}>
              {steps.filter((step, index) => currentStep === index)[0]}
            </StepAnimation>
          </Col>
        </Row>
      </div>
    );
  }
}

export default TestQueryForm;
