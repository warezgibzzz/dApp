/**
 * Steps for use by GuidedDeployment.
 * 
 */
import React, { Component } from 'react';
import { Row, Col, Icon, Form, Button } from 'antd';
import { FieldSettings } from './DeployContractField';

const FormItem = Form.Item;
const ButtonGroup = Button.Group;

function BiDirectionalNav(props) {
  return (<ButtonGroup>
    <Button type="default" onClick={props.onPrevClicked} >
      <Icon type="left" />Back
    </Button>
    <Button type="primary" onClick={props.onNextClicked} >
      {props.text}<Icon type="right" />
    </Button>
  </ButtonGroup>);
}

/**
 * First step in the guided contract.
 * It displays two fields. First to collect name of the contract and
 * second to collect the base address.
 * 
 */
 class NameContractStep extends Component {

  render() {
    const contractNameSettings = FieldSettings.contractName;
    const baseTokenAddressSettings = FieldSettings.baseTokenAddress;

    return (<div>
      <FormItem
        label={contractNameSettings.label}>
        {contractNameSettings.component()}
      </FormItem>
      <FormItem
        label={baseTokenAddressSettings.label}>
        {baseTokenAddressSettings.component()}
      </FormItem>
      <Row type="flex" justify="end">
        <Col>
          <Button type="primary" onClick={this.props.onNextClicked} >
            Set Pricing Range<Icon type="arrow-right" />
          </Button>
        </Col>
      </Row>
    </div>);
  }
 }

 /**
  * Step for Setting Price Cap and floor
  *
  */
 class PricingStep extends Component {

  render() {
    const priceCapSettings = FieldSettings.priceCap;
    const priceFloorsettings = FieldSettings.priceFloor;
    const form = {};
    return(<div>
      <FormItem
        label={priceCapSettings.label}>
        {priceCapSettings.component({ form })}
      </FormItem>
      <FormItem
        label={priceFloorsettings.label}>
        {priceFloorsettings.component({ form })}
      </FormItem>
      <Row type="flex" justify="end">
        <Col>
          <BiDirectionalNav text="Set Expiration Time" {...this.props} />
        </Col>
      </Row>
    </div>);
  }
 }

 /**
  * Step for setting the expiration time for the contract
  *
  */
 class ExpirationStep extends Component {

  render() {
    const expirationSettings = FieldSettings.expirationTimeStamp;
    return (<div>
      <FormItem
        label={expirationSettings.label}>
        {expirationSettings.component()}
      </FormItem>
      <Row type="flex" justify="end">
        <Col>
          <BiDirectionalNav text="Select Data Source" {...this.props} />
        </Col>
      </Row>
    </div>);
  }
 }

 /**
  * Step to select the Oracle Data source and the query frequency for the contract 
  *
  */
 class DataSourceStep extends Component {

  render() {
    const oracleDataSourceSettings = FieldSettings.oracleDataSource;
    const oracleQuerySettings = FieldSettings.oracleQuery;
    const oracleQueryRepeatSettings = FieldSettings.oracleQueryRepeatSeconds;

    return (<div>
      <FormItem
        label={oracleDataSourceSettings.label}>
        {oracleDataSourceSettings.component()}
      </FormItem>
      <FormItem
        label={oracleQuerySettings.label}>
        {oracleQuerySettings.component()}
      </FormItem>
      <FormItem
        label={oracleQueryRepeatSettings.label}>
        {oracleQueryRepeatSettings.component()}
      </FormItem>
      <Row type="flex" justify="end">
        <Col>
          <BiDirectionalNav text="Deploy Contract" {...this.props} />
        </Col>
      </Row>
    </div>);
  }
 }

 /**
  * Final Step for showing deploy status of Contract
  * and possible a summary of the deployed contract on success. 
  *
  */
 class DeployStep extends Component {

  render() {
    return (<div></div>);
  }
 }

 export { NameContractStep, PricingStep, ExpirationStep, DataSourceStep, DeployStep };