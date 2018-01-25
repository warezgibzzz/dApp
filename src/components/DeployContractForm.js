import React, { Component } from 'react';
import { Form, Button } from 'antd';

import Field from './DeployContractField';

const FormItem = Form.Item

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

class DeployContractForm extends Component {
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
          <Button type="primary" htmlType="submit">
            Deploy Contract
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedDeployContactForm = Form.create()(DeployContractForm);

export default WrappedDeployContactForm;
