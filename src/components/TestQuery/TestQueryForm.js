import React, { Component } from 'react';
import { Row, Col, Steps } from 'antd';
import { AboutOraclesStep, SelectDataSourceStep, SetQueryStep, QueryResultStep } from './Steps'

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

class TestQueryForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      step: 0,
      oracleDataSource: 'URL',
      oracleQuery:
        'json(https://api.kraken.com/0/public/Ticker?pair=ETHUSD).result.XETHZUSD.c.0'
    };
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
    })
  }

  onQuerySubmit() {
    this.toNextStep()
    this.props.onTestQuery(this.state)
  }

  toNextStep() {
    this.setState({
      step: this.state.step + 1
    })
  }

  toPrevStep() {
    this.setState({
      step: this.state.step - 1
    })
  }

  onRestart() {
    this.setState({
      step: 1 // <-- Select Datasource Step
    })
  }

  render() {
    const currentStep = this.state.step
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
        onRestartClicked={this.onRestart.bind(this)} />,
    ]
    
    return (
        <Row type="flex" justify="center">
          <Col {...parentColLayout}>
            <Steps current={currentStep}>
              <Step title="Introduction"/>
              <Step title="Oracle Datasource" />
              <Step title="Oracle Query" />
              <Step title="Result" />
            </Steps>
            <br/>
            {steps.filter((step, index) => currentStep === index )}
          </Col>
        </Row>
      
    );
  }
}

export default TestQueryForm;
