import React, { Component } from 'react';
import { Form, Button } from 'antd';

import Field from './DeployContractField';

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

        <Button type="primary" htmlType="submit">
          Deploy Contract
        </Button>
      </Form>
    );
  }
}

const WrappedDeployContactForm = Form.create()(DeployContractForm);

export default WrappedDeployContactForm;
