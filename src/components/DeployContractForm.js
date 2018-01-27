import React, { Component } from 'react';
import { Row, Col, message, Form, Button } from 'antd';

import Field from './DeployContractField';
const FormItem = Form.Item;

const tailFormItemLayout = {
  xs: {
    span: 24,
  },
  sm: {
    span: 8
  },
};

class DeployContractForm extends Component {
  componentWillReceiveProps(nextProps) {
    if(!this.props.loading && nextProps.loading) {
      // We've submitted the form and contract is being deployed
      message.info('Deploying contract...');
    }

    if(this.props.loading && !nextProps.loading) {
      if(nextProps.error) {
        // We had an error
        message.error(`There was an error deploying the contract: ${nextProps.error}`);
      } else if (nextProps.contract) {
        // Contract was deployed
        message.success('Contract successfully deployed');
      }
    }
  }

  handleDeploy(event) {
    event.preventDefault();

    this.props.onDeployContract(this.props.form.getFieldsValue());
  }

  render() {
    const DecoratedField = (props) => (<Field {...props} form={this.props.form} />);

    return (
      <Form onSubmit={this.handleDeploy.bind(this)} layout="vertical">

        <Row type="flex" gutter={16}>
          <Col span="12">
            <DecoratedField name='contractName' />
          </Col>
          <Col span="12">
            <DecoratedField name='baseTokenAddress' />
          </Col>
        </Row>

        <Row type="flex" gutter={16}>
          <Col span="12">
            <DecoratedField name='priceFloor' />
          </Col>
          <Col span="12">
            <DecoratedField name='priceCap' />
          </Col>
        </Row>

        <Row type="flex" gutter={16}>
          <Col span="12">
            <DecoratedField name='priceDecimalPlaces' />
          </Col>
          <Col span="12">
            <DecoratedField name='qtyDecimalPlaces' />
          </Col>
        </Row>

        <Row type="flex" gutter={16}>
          <Col span="12">
            <DecoratedField name='expirationTimeStamp' />
          </Col>

          <Col span="12">
            <DecoratedField name='oracleDataSource' />
          </Col>
        </Row>

        <Row type="flex" gutter={16}>
          <Col span="12">
            <DecoratedField name='oracleQuery' />
          </Col>
          <Col span="12">
            <DecoratedField name='oracleQueryRepeatSeconds' />
          </Col>
        </Row>

        <Row type="flex" justify="center">
          <Col {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" loading={this.props.loading} style={{width: '100%'}}>
              Deploy Contract
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

const WrappedDeployContactForm = Form.create()(DeployContractForm);

export default WrappedDeployContactForm;
