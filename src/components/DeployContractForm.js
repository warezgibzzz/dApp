import React, { Component } from 'react';
import { Row, Col, message, Form, Button } from 'antd';

import Field from './DeployContractField';

const formButtonLayout = {
  xs: {
    span: 24,
  },
  sm: {
    span: 8
  },
};

const formItemColLayout = {
  lg: {
    span: 8
  },
  sm: {
    span: 12
  },
  xs: {
    span: 24
  }
};

function ContractFormRow(props) {
  return (
    <Row type="flex" justify="center" gutter={16} {...props}>
      {props.children}
    </Row>
  );
}

function ContractFormCol(props) {
  return (
    <Col {...formItemColLayout} {...props}>
      {props.children}
    </Col>
  );
}

class DeployContractForm extends Component {
  componentWillReceiveProps(nextProps) {
    if(this.props.loading && !nextProps.loading) {
      if(nextProps.error) {
        // We had an error
        message.error(`There was an error deploying the contract: ${nextProps.error}`, 8);
      } else if (nextProps.contract) {
        // Contract was deployed
        message.success('Contract successfully deployed', 5);
      }
    }
  }

  handleDeploy(event) {
    event.preventDefault();

    this.props.form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }

      const values = {
        ...fieldsValue,
        expirationTimeStamp: Math.floor(fieldsValue['expirationTimeStamp'].valueOf() / 1000)
      };

      this.props.onDeployContract(values);
    });
  }

  render() {
    return (
      <Form onSubmit={this.handleDeploy.bind(this)} layout="vertical">
        <ContractFormRow>
          <ContractFormCol>
            <Field name='contractName' form={this.props.form} />
          </ContractFormCol>

          <ContractFormCol>
            <Field name='baseTokenAddress' form={this.props.form} />
          </ContractFormCol>
        </ContractFormRow>

        <ContractFormRow>
          <ContractFormCol>
            <Field name='priceFloor' form={this.props.form} />
          </ContractFormCol>

          <ContractFormCol>
            <Field name='priceCap' form={this.props.form} />
          </ContractFormCol>
        </ContractFormRow>

        <ContractFormRow>
          <ContractFormCol>
            <Field name='priceDecimalPlaces' form={this.props.form} />
          </ContractFormCol>

          <ContractFormCol>
            <Field name='qtyDecimalPlaces' form={this.props.form} />
          </ContractFormCol>
        </ContractFormRow>

        <ContractFormRow>
          <ContractFormCol>
            <Field name='expirationTimeStamp' form={this.props.form} />
          </ContractFormCol>

          <ContractFormCol>
            <Field name='oracleDataSource' form={this.props.form} />
          </ContractFormCol>
        </ContractFormRow>

        <ContractFormRow>
          <ContractFormCol>
            <Field name='oracleQuery' form={this.props.form} />
          </ContractFormCol>

          <ContractFormCol>
            <Field name='oracleQueryRepeatSeconds' form={this.props.form} />
          </ContractFormCol>
        </ContractFormRow>

        <Row type="flex" justify="center">
          <Col {...formButtonLayout}>
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
