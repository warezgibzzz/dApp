import React, { Component } from 'react';
import { Row, Col, Form, Input, Select, Button, Icon, Card, Alert } from 'antd';
import Loader from '../Loader'
import OracleDataSources from './OracleDataSources'

const FormItem = Form.Item;
const Option = Select.Option;
const ButtonGroup = Button.Group

// Steps used by the TestQueryForm

function getDataSourceObj(source) {
  return OracleDataSources.filter(sourceObj => source === sourceObj.name)[0]
}

/**
 * Component in charge of rendering about Oracles step
 * First Step
 */
class AboutOraclesStep extends Component {

  render() {
    return (<div>
      <Row>
        <Col>
          <h2>Testing Oracle Queries</h2>
          <div>
            In the blockchain space, an oracle is a party which provides data. The need for such figure arise from the fact that blockchain applications 
            cannot access and fetch directly the data they require.
          </div>
          <br/>
          <div>
            This page is used to test requests to an oracle Cools.
          </div>
        </Col>
      </Row>
      <br/>
      <Row type="flex" justify="center">
        <Col>
          <Button type="primary" onClick={this.props.onNextClicked} >Cick Here to Start</Button>
        </Col>
      </Row>
    </div>)
  }
}


/**
 * Component to enlighten about Selecting Oracles
 * Second Step
 * 
 */
class SelectDataSourceStep extends Component {

  constructor(props) {
      super(props)
      this.state = {
        dataSource: props.dataSource || OracleDataSources[0].name
      }
  }

  onDataSourceChange(source) {
      this.setState({ dataSource: source })
      this.props.onChange(source)
  }

  render() {
      const source = this.state.dataSource
      return (<div>
      <Row>
      <Col>
          <h2>Select an Oracle Datasource</h2>
          <div>
          Listed here are the data-sources you can choose from when using oracle service.
          </div>
      </Col>
      </Row>
      <Row>
      <Col>
        <FormItem
        label="Select a Datasource">
            <Select defaultValue={source} size="large" onChange={this.onDataSourceChange.bind(this)} style={{ width: '100%' }}>
                {OracleDataSources.map(({ name }) => <Option key={name} value={name}>{name}</Option>)}
            </Select>
        </FormItem>
      </Col>
      </Row>
      <Row>
      <Col>
          <h3>About '{source}' Datasources</h3>
          {getDataSourceObj(source).descriptionComponent()}
      </Col>
      </Row>
      <br/>
      <Row type="flex" justify="end">
      <Col>
          <ButtonGroup>
          <Button type="default" onClick={this.props.onPrevClicked} >
              <Icon type="left" />Back
          </Button>
          <Button type="primary" onClick={this.props.onNextClicked} >
              Enter Query<Icon type="right" />
          </Button>
          </ButtonGroup>
      </Col>
      </Row>
  </div>)
  }
}

/**
 * Component to Set Query based on the data source specified.
 * Third Step
 * 
 */
class SetQueryStep extends Component {

    constructor(props) {
      super(props);
  
      this.state = {
        query: '',
        error: null,
      };
    }
  
    onInputChange(e) {
      const text = e.target.value;
      this.setState({ query: text, error: null });
      this.props.onChange(text);
    }
  
    validateAndSubmit() {
      const dataSourceObj = getDataSourceObj(this.props.dataSource);
      if (dataSourceObj.isQueryValid(this.state.query)) {
        this.props.onSubmit();
      } else {
        this.setState({ error: dataSourceObj.queryHint() })
      }
    }
  
    render() {
      const { dataSource } = this.props;
      return (<div>
        <Row>
          <Col>
            <h2>Enter a Query to test on '{dataSource}' Datasource</h2>
            <div>
            NOTE: You can specify your <a href="http://docs.oraclize.it/#general-concepts-parsing-helpers">parsing helpers</a> with the query too.
            </div>
            <br/>
            <FormItem
              label="Enter Query">
                {this.state.error && <Alert message={this.state.error} type="error" />}
                <Input placeholder="Query" onChange={this.onInputChange.bind(this)}/>
            </FormItem>
          </Col>
        </Row>
        <Row type="flex" justify="end">
          <Col>
          <ButtonGroup>
            <Button type="default" onClick={this.props.onPrevClicked} >
              <Icon type="left" />Back
            </Button>
            <Button type="primary" onClick={this.validateAndSubmit.bind(this)} >
              Submit Query<Icon type="right" />
            </Button>
          </ButtonGroup>
          </Col>
        </Row>
      </div>)
    }
}
  
/**
 * Component to Show the Result of Query after fetching
 * Fourth Step
 * 
 */
class QueryResultStep extends Component {
    render() {
        return (<div style={{ padding: '30px' }}>
        <Row type="flex" justify="center">
            <Col lg={{ span: 16 }} sm={{ span: 24 }} xs={{ span: 24 }}>
            <Card title="Query Result" style={{ width: '100%' }}>
                <Loader loading={this.props.loading} style={{ width: 80, height: 80 }}/>
                {!this.props.loading && !this.props.error && <p>{this.props.result}</p>}
                {!this.props.loading && this.props.error && <Alert message={this.props.error} type="error" />}
            </Card>
            </Col>
        </Row>
        <br/>
        <Row type="flex" justify="end">
            <Col>
            <Button type="primary" onClick={this.props.onRestartClicked} >
                <Icon type="arrow-left" />Try Another Test
            </Button>
            </Col>
        </Row>
        </div>)
    }
}

export { AboutOraclesStep, SelectDataSourceStep, SetQueryStep, QueryResultStep }