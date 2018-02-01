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
          <h1>Testing Oracle Queries</h1>
          <div>
            <h2>What is an Oracle?</h2>
            In the blockchain space, an oracle is a party which provides data. The need for such 
             figure arise from the fact that blockchain applications cannot access and fetch 
             directly the data they require.
          </div>
          <br/>
          <div>
            <h2>Which Oracle are we using?</h2>
            The oracle is <a href="http://www.oraclize.it/">Oraclize</a>. Oraclize is the 
             leading oracle service for smart contracts and blockchain applications, serving 
             thousands of requests for day every day on Ethereum, Bitcoin and Rootstock.
          </div>
          <br/>
          <div>
            <h2>How it works</h2>
            Oraclize internally replicates an “If This Then That” logical model. This means that it 
             will execute a given set of instructions if some other given conditions are met.
             A valid request to Oraclize should specify a <b>Data Source</b> and a <b>Query</b>.
          </div>
          <br/>
        </Col>
      </Row>
      <br/>
      <Row type="flex" justify="end">
        <Col>
          <Button type="primary" onClick={this.props.onNextClicked} >
            Select a Data Source <Icon type="arrow-right" />
          </Button>
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
          <h1>Select a Data Source</h1>
          <div>
            A data source is a trusted provider of data. It can be a website or web API such as Reuters, 
             Weather.com, BBC.com, or a secure application running on an hardware-enforced Trusted 
             Execution Environment (TEE) or an auditable, locked-down virtual machine instance running 
             in a cloud provider.
          </div>
          <br/>
          <div>
            Below are the data sources you can choose from when using <a href="http://www.oraclize.it/">Oraclize</a>.
            Select one and proceed to test out a query.
          </div>
      </Col>
      </Row>
      <Row>
      <Col>
        <FormItem
        label="Select a Datasource">
            <Select 
              defaultValue={source} 
              size="large" 
              onChange={this.onDataSourceChange.bind(this)} 
              style={{ width: '100%' }}>
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
            <h1>Enter a Query to test on '{dataSource}' Datasource</h1>
            <div>
              A query is request which needs to be evaluated in order to complete a specific data source type request.
            </div>
            <br/>
            <div>
              <h2>Some examples of {dataSource} Queries</h2>
              <ul>
                {getDataSourceObj(dataSource).sampleQueries.map(sample => <li>{sample}</li>)}
              </ul>
            </div>
            <FormItem
              label="Enter a query to text">
                {this.state.error && <Alert message={this.state.error} type="error" />}
                <Input placeholder="Query" onChange={this.onInputChange.bind(this)}/>
            </FormItem>
            <div>
              NOTE: You can specify your <a href="http://docs.oraclize.it/#general-concepts-parsing-helpers">parsing helpers</a> with 
               the query too.
            </div>
          </Col>
        </Row>
        <Row type="flex" justify="end">
          <Col>
          <ButtonGroup>
            <Button type="default" onClick={this.props.onPrevClicked} >
              <Icon type="left" />Change Data Source
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
                <Icon type="arrow-left" />Test another query
            </Button>
            </Col>
        </Row>
        </div>)
    }
}

export { AboutOraclesStep, SelectDataSourceStep, SetQueryStep, QueryResultStep }