import React from 'react';
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

const fieldSettingsByName = {
  contractName: {
    label: 'Name',
    initialValue: 'ETH/BTC',
    rules: [{
      required: true, message: 'Please enter a name for your contract',
    }],
    component: (<Input />)
  },

  baseTokenAddress: {
    label: 'Base Token Address',
    initialValue: '0x123',
    rules: [{
      required: true, message: 'Please enter a name for your contract',
    }],
    component: (<Input />)
  },

  priceFloor: {
    label: 'Price Floor',
    initialValue: 0,
    rules: [{
      required: true, message: 'Please enter a name for your contract',
    }],
    component: (<InputNumber min={0} />)
  },

  priceCap: {
    label: 'Price Cap',
    initialValue: 150,
    rules: [{
      required: true, message: 'Please enter a name for your contract',
    }],
    component: (<InputNumber min={0} />)
  },

  priceDecimalPlaces: {
    label: 'Price Decimal Places',
    initialValue: 2,
    rules: [{
      required: true, message: 'Please enter a name for your contract',
    }],
    component: (<InputNumber min={0} />)
  },

  qtyDecimalPlaces: {
    label: 'Qty Decimal Places',
    initialValue: 2,
    rules: [{
      required: true, message: 'Please enter a name for your contract',
    }],
    component: (<InputNumber min={0} />)
  },

  expirationTimeStamp: {
    label: 'Expiration Time Stamp',
    initialValue: Math.floor(Date.now() / 1000) + 28 * 86400, // default to 28 days from now
    rules: [{
      required: true, message: 'Please enter a name for your contract',
    }],
    component: (<InputNumber min={0} />)
  },

  oracleDataSource: {
    label: 'Oraclize.it data source',
    initialValue: 'URL',
    rules: [{
      required: true, message: 'Please enter a name for your contract',
    }],
    component: (<Input />)
  },

  oracleQuery: {
    label: 'Oraclize.it Query',
    initialValue: 'json(https://api.kraken.com/0/public/Ticker?pair=ETHUSD).result.XETHZUSD.c.0',
    rules: [{
      required: true, message: 'Please enter a name for your contract',
    }],
    component: (<Input />)
  },

  oracleQueryRepeatSeconds: {
    label: 'Query Repeat Seconds',
    initialValue: 86400,
    rules: [{
      required: true, message: 'Please enter a name for your contract',
    }],
    component: (<InputNumber min={0} />)
  },
};

function DeployContractField(props) {
  const { name, form } = props;
  const { getFieldDecorator } = form;
  const fieldSettings = fieldSettingsByName[name];

  return (
    <FormItem
      {...formItemLayout}
      label={fieldSettings.label}
    >
      {getFieldDecorator(name, {
        initialValue: fieldSettings.initialValue,
        rules: fieldSettings.rules,
      })(
        fieldSettings.component
      )}
    </FormItem>
  );
}

export default DeployContractField;
