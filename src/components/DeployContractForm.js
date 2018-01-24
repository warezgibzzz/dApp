import React, { Component } from 'react';
import { Form, Input, InputNumber } from 'antd';
const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
};

class DeployContractForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contractName: 'ETH/BTC',
      baseTokenAddress: '0x123',
      priceFloor: 0,
      priceCap: 150,
      priceDecimalPlaces: 2,
      qtyDecimalPlaces: 2,
      expirationTimeStamp: Math.floor(Date.now() / 1000) + 28 * 86400, // default to 28 days from now
      oracleDataSource: 'URL',
      oracleQuery: 'json(https://api.kraken.com/0/public/Ticker?pair=ETHUSD).result.XETHZUSD.c.0',
      oracleQueryRepeatSeconds: 86400
    };
  }

  onInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleDeploy(event) {
    event.preventDefault();
    this.props.onDeployContract(this.state);
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form onSubmit={this.handleDeploy.bind(this)}>
        <FormItem
          {...formItemLayout}
          label="Name"
        >
          {getFieldDecorator('contractName', {
            rules: [{
              required: true, message: 'Please enter a name for your contract',
            }],
          })(
            <Input />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="Base Token Address"
        >
          {getFieldDecorator('baseTokenAddress', {
            rules: [{
              required: true, message: 'Please enter an base token address',
            }],
          })(
            <Input />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="Price Floor"
        >
          {getFieldDecorator('priceFloor', {
            rules: [{
              required: true, message: 'Please enter an base token address',
            }],
          })(
            <InputNumber min={0} />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="Price Cap"
        >
          {getFieldDecorator('priceCap', {
            rules: [{
              required: true, message: 'Please enter an base token address',
            }],
          })(
            <InputNumber min={0} />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="Price Decimal Places"
        >
          {getFieldDecorator('priceDecimalPlaces', {
            rules: [{
              required: true, message: 'Please enter an base token address',
            }],
          })(
            <InputNumber min={0} />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="Qty Decimal Places"
        >
          {getFieldDecorator('qtyDecimalPlaces', {
            rules: [{
              required: true, message: 'Please enter an base token address',
            }],
          })(
            <InputNumber min={0} />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="Expiration Time Stamp"
        >
          {getFieldDecorator('expirationTimeStamp', {
            rules: [{
              required: true, message: 'Please enter an base token address',
            }],
          })(
            <InputNumber min={0} />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="Oraclize.it data source"
        >
          {getFieldDecorator('oracleDataSource', {
            rules: [{
              required: true, message: 'Please enter a name for your contract',
            }],
          })(
            <Input />
          )}
        </FormItem>


        <FormItem
          {...formItemLayout}
          label="Oraclize.it Query"
        >
          {getFieldDecorator('oracleQuery', {
            rules: [{
              required: true, message: 'Please enter a name for your contract',
            }],
          })(
            <Input />
          )}
        </FormItem>


        <FormItem
          {...formItemLayout}
          label="Query Repeat Seconds"
        >
          {getFieldDecorator('oracleQueryRepeatSeconds', {
            rules: [{
              required: true, message: 'Please enter an base token address',
            }],
          })(
            <InputNumber min={0} />
          )}
        </FormItem>

          <button type="deploy" className="pure-button pure-button-primary">
            Deploy Contract
          </button>
      </Form>
    );
  }
}


const WrappedDeployContactForm = Form.create()(DeployContractForm);

export default WrappedDeployContactForm;
