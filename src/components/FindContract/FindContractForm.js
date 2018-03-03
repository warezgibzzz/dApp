import React, { Component } from 'react';
import { Row, Col, Form, Button, List, Card } from 'antd';

import Loader from '../Loader';
import Field from './FindContractField';
import FindContractSuccess from './FindContractSuccess';
import showMessage from '../message';


class FindContractForm extends Component {
  constructor(props) {
    super(props);

    this.showErrorMessage=showMessage.bind(showMessage, 'error');
    this.showSuccessMessage=showMessage.bind(showMessage, 'success');

    this.state = {
      marketContractAddress: '',
      contract: [],
      keyMap: {
          "key": "Address",
          "CONTRACT_NAME": "Contract Name",
          "BASE_TOKEN": "Base Token",
          "BASE_TOKEN_SYMBOL": "Base Token Symbol",
          "PRICE_FLOOR": "Price Floor",
          "PRICE_CAP": "Price Cap",
          "PRICE_DECIMAL_PLACES": "Price Decimal Places",
          "QTY_MULTIPLIER": "Quantity Multiplier",
          "ORACLE_QUERY": "Oracle Query",
          "EXPIRATION": "Expiration time",
          "lastPrice": "Last Price",
          "isSettled": "Is Settled",
          "collateralPoolBalance": "Collateral Pool Balance",
      },
    };
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.loading && !nextProps.loading) {
      if(nextProps.error) {
        this.showErrorMessage("Contract not found at this address!", 8);
      } else if (nextProps.contract) {
        this.showSuccessMessage(FindContractSuccess({ contract: nextProps.contract }), 3);
      }
    }
  }

  handleReset(event) {
    event.preventDefault();
    this.props.form.resetFields();

  }

  handleFind(event) {
    event.preventDefault();

    this.props.form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }
      const values = {
        ...fieldsValue,
      };
      this.props.onFindContract(values);
    });
  }

  isSubmitDisabled() {
    if(this.props.loading) return true;

    const errors = this.props.form.getFieldsError();
    return Object.keys(errors).some(field => errors[field]);
  }

  render() {
    return (<div>
      <br/>
      <Form onSubmit={this.handleFind.bind(this)} layout="vertical">
        <ContractFormRow>
          <ContractFormCol>
            <Field name='marketContractAddress' form={this.props.form} showHint/>
          </ContractFormCol>
        </ContractFormRow>

        <Row type="flex" justify="center">
          <Col {...formButtonLayout}>
            <Button className="submit-button" type="primary" htmlType="submit" loading={this.props.loading} disabled={this.isSubmitDisabled()} style={{width: '100%'}}>
              Find Contract
            </Button>
          </Col>
        </Row>

        <Row type="flex" justify="center" style={{ marginTop: '16px' }}>
          <Col {...formButtonLayout}>
            <Button className="reset-button" type="secondary" style={{width: '100%'}} disabled={this.props.loading} onClick={this.handleReset.bind(this)}>
              Reset Form
            </Button>
          </Col>
        </Row>
        <Loader loading={this.props.loading} />
      </Form>
      <br />
      { this.props.contract.length > 0 &&
      <List
        grid={{ gutter: 16, column: 2 }}
        dataSource={this.props.contract}
        renderItem={item => (
        <List.Item>
          <Card title={this.state.keyMap[item.name]}>{item.value.toString()}</Card>
        </List.Item>
        )}
        {...formItemColLayout}
      />
      }
    </div>);
  }
}

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

export default Form.create()(FindContractForm);
