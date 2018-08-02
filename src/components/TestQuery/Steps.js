import { Alert, Button, Col, Form, Icon, Input, Row, Select } from 'antd';
import React, { Component } from 'react';

import Loader from '../Loader';
import '../../less/Step.less';
import OracleDataSources, { getDataSourceObj } from './OracleDataSources';
import GasPriceField from '../GasPriceField';

const FormItem = Form.Item;
const Option = Select.Option;
const ButtonGroup = Button.Group;

// Steps used by the TestQueryForm

/**
 * Component in charge of rendering about Oracles step
 * First Step
 */
class AboutOraclesStep extends Component {
  render() {
    return (
      <div>
        <h1 className="text-center">Testing Oracle Queries</h1>
        <div className="deploy-contract-container guided-deploy">
          <Row>
            <Col>
              <div>
                <h2>What is an Oracle?</h2>
                Blockchain applications natively are unable to interact with
                outside data sources. An oracle is a third party that provides
                the ability to access off chain data from the blockchain
                ensuring its validity using cryptographic proofs.
              </div>
              <br />
              <div>
                <h2>Which Oracle are we using?</h2>
                Our proof of concept has been built using
                <a
                  href="http://www.oraclize.it/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {' '}
                  Oraclize.it
                </a>, the leading oracle service for smart contracts and
                blockchain applications, serving thousands of requests every day
                on Ethereum, Bitcoin and Rootstock.
              </div>
              <br />
              <div>
                <h2>How it works</h2>
                Oraclize internally replicates an “If This Then That” logical
                model. This means that it will execute a given set of
                instructions if some other given conditions have been met. A
                valid request to Oraclize should specify both a{' '}
                <b>Data Source</b> and a <b>Query</b>. We will walk you through
                that process here.
              </div>
            </Col>
          </Row>
        </div>
        <div className="step-button-nav-container" style={{ width: '100%' }}>
          <Button
            className="step-action-button"
            onClick={this.props.onNextClicked}
          >
            Select Data Source
            <Icon type="right" />
          </Button>
        </div>
      </div>
    );
  }
}

/**
 * Component to enlighten about Selecting Oracles
 * Second Step
 *
 */
class SelectDataSourceStep extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: props.dataSource || OracleDataSources[0].name
    };
  }

  onDataSourceChange(source) {
    this.setState({ dataSource: source });
    this.props.onChange(source);
  }

  render() {
    const source = this.state.dataSource;
    return (
      <div>
        <h1 className="text-center">Select a Data Source</h1>
        <div className="deploy-contract-container guided-deploy">
          <Row>
            <Col>
              <div>
                A data source is a trusted provider of data. It can be a website
                or web API such as Reuters, Weather.com, BBC.com. For many of
                our intended use cases a centralised crypto exchanges API works
                well. Additional options include a secure application running on
                an hardware-enforced Trusted Execution Environment (TEE) or
                perhaps, an audit-able, locked-down virtual machine instance
                running in a cloud provider. The most obviously useful data
                sources for our derivatives contracts are URL and WolframAlpha.
              </div>
              <br />
              <div>
                Below are the data sources you can choose from when using
                <a
                  href="http://www.oraclize.it/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {' '}
                  Oraclize.it
                </a>. Select one and proceed to test out a query.
              </div>
              <FormItem label="Select a Data Source">
                <Select
                  defaultValue={source}
                  size="large"
                  onChange={this.onDataSourceChange.bind(this)}
                  style={{ width: '100%' }}
                >
                  {OracleDataSources.map(({ name }) => (
                    <Option key={name} value={name}>
                      {name}
                    </Option>
                  ))}
                </Select>
              </FormItem>
              <h3>More info on '{source}' data sources</h3>
              {getDataSourceObj(source).descriptionComponent()}
            </Col>
          </Row>
        </div>
        <div className="step-button-nav-container" style={{ width: '100%' }}>
          <Button
            onClick={this.props.onPrevClicked}
            className="step-back-button"
          >
            <Icon type="left" />Back
          </Button>
          <Button
            onClick={this.props.onNextClicked}
            className="step-action-button"
          >
            Enter Query
            <Icon type="right" />
          </Button>
        </div>
      </div>
    );
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
      error: null
    };
  }

  onInputChange(e) {
    const text = e.target.value;
    this.setState({ query: text, error: null });
    this.props.onChange(text);
  }

  onUpdateGasLimit(gas) {
    this.props.onUpdateGasLimit(gas);
  }

  onUpdateGasPrice(price) {
    this.props.onUpdateGasPrice(price);
  }

  validateAndSubmit() {
    const dataSourceObj = getDataSourceObj(this.props.dataSource);

    if (dataSourceObj.isQueryValid(this.state.query)) {
      this.props.onSubmit();
    } else {
      this.setState({ error: dataSourceObj.queryHint() });
    }
  }

  render() {
    const { dataSource, location, network, gas } = this.props;

    return (
      <div>
        <h1 className="text-center">
          Enter a Query to test on '{dataSource}' Data Source
        </h1>
        <div className="deploy-contract-container guided-deploy">
          <Row>
            <Col>
              <p>
                A query is request which needs to be evaluated in order to
                complete a specific data source type request.
              </p>
              <br />
              <div>
                <h2>Some examples of {dataSource} Queries</h2>
                <div className="sample-query-list">
                  {getDataSourceObj(dataSource).sampleQueries.map(
                    (sample, idx) => {
                      return (
                        <div className="sample-query-item" key={idx}>
                          {sample.title && (
                            <div className="sample-query-title">
                              {sample.title}:
                            </div>
                          )}
                          <div className="sample-query">{sample.query}</div>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
              <FormItem label="Enter a query to test">
                {this.state.error && (
                  <Alert message={this.state.error} type="error" />
                )}
                <Input
                  placeholder="Query"
                  onChange={this.onInputChange.bind(this)}
                />
              </FormItem>
              <div>
                NOTE: You can specify your
                <a
                  href="http://docs.oraclize.it/#general-concepts-parsing-helpers"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {' '}
                  parsing helpers{' '}
                </a>
                with the query too.
              </div>
              <br />
            </Col>
          </Row>
          <GasPriceField
            location={location}
            network={network}
            gaslimit={gas}
            onUpdateGasLimit={this.onUpdateGasLimit.bind(this)}
            onUpdateGasPrice={this.onUpdateGasPrice.bind(this)}
          />
        </div>
        <div className="step-button-nav-container" style={{ width: '100%' }}>
          <Button
            onClick={this.props.onPrevClicked}
            className="step-back-button"
          >
            <Icon type="left" />Back
          </Button>
          <Button
            onClick={this.validateAndSubmit.bind(this)}
            className="step-action-button"
          >
            Submit Query
            <Icon type="right" />
          </Button>
        </div>
      </div>
    );
  }
}

/**
 * Component to Show the Result of Query after fetching
 * Fourth Step
 *
 */
class QueryResultStep extends Component {
  render() {
    return (
      <div>
        <h1 className="text-center">Query Results</h1>
        <div className="deploy-contract-container guided-deploy">
          {this.props.loading && (
            <div style={{ position: 'relative', height: '100px' }}>
              <Loader />
            </div>
          )}
          {!this.props.loading &&
            !this.props.error && <p className="result">{this.props.result}</p>}
          {!this.props.loading &&
            this.props.error && (
              <Alert message={`${this.props.error}`} type="error" />
            )}
          <br />
          {!this.props.loading &&
            this.props.error && (
              <Button type="primary" onClick={this.props.onFailSubmit}>
                Try again
              </Button>
            )}
          {!this.props.loading &&
            !this.props.error && (
              <ButtonGroup>
                <Button type="default" onClick={this.props.onPrevClicked}>
                  <Icon type="left" />Test another query
                </Button>
                <Button
                  type="primary"
                  onClick={this.props.onCreateContractClicked}
                >
                  Create contract with Query<Icon type="right" />
                </Button>
              </ButtonGroup>
            )}
        </div>
      </div>
    );
  }
}

export {
  AboutOraclesStep,
  SelectDataSourceStep,
  SetQueryStep,
  QueryResultStep
};
