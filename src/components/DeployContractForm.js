import React, { Component } from 'react';
import { message, Form, Button } from 'antd';

import Field from './DeployContractField';
const FormItem = Form.Item;

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 10,
    },
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
    const fields = [
      'contractName', 'baseTokenAddress',
      'priceFloor', 'priceCap', 'priceDecimalPlaces', 'qtyDecimalPlaces',
      'expirationTimeStamp',
      'oracleDataSource', 'oracleQuery', 'oracleQueryRepeatSeconds'
    ];

    return (
      <Form onSubmit={this.handleDeploy.bind(this)}>

        {
          fields.map(fieldName => <Field name={fieldName} key={fieldName} form={this.props.form} />)
        }

        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" loading={this.props.loading}>
            Deploy Contract
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedDeployContactForm = Form.create()(DeployContractForm);

export default WrappedDeployContactForm;
