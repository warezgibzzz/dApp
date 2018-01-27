import React from 'react';
import moment from 'moment';
import { Form, Input, InputNumber, DatePicker } from 'antd';
const FormItem = Form.Item;

const fieldSettingsByName = {
  contractName: {
    label: 'Name',
    initialValue: 'ETH/BTC',
    rules: [{
      required: true, message: 'Please enter a name for your contract',
    }],
    extra: 'Placeholder explanation',

    component: (<Input />)
  },

  baseTokenAddress: {
    label: 'Base Token Address',
    initialValue: '0x123',
    rules: [{
      required: true, message: 'Please enter a name for your contract',
    }],
    extra: 'Placeholder explanation',

    component: (<Input />)
  },

  priceFloor: {
    label: 'Price Floor',
    initialValue: 0,
    rules: [{
      required: true, message: 'Please enter a name for your contract',
    }],
    extra: 'Placeholder explanation',

    component: (<InputNumber min={0} style={{width: '100%'}} />)
  },

  priceCap: {
    label: 'Price Cap',
    initialValue: 150,
    rules: [{
      required: true, message: 'Please enter a name for your contract',
    }],
    extra: 'Placeholder explanation',

    component: (<InputNumber min={0} style={{width: '100%'}} />)
  },

  priceDecimalPlaces: {
    label: 'Price Decimal Places',
    initialValue: 2,
    rules: [{
      required: true, message: 'Please enter a name for your contract',
    }],
    extra: 'Placeholder explanation',

    component: (<InputNumber min={0} style={{width: '100%'}} />)
  },

  qtyDecimalPlaces: {
    label: 'Qty Decimal Places',
    initialValue: 2,
    rules: [{
      required: true, message: 'Please enter a name for your contract',
    }],
    extra: 'Placeholder explanation',

    component: (<InputNumber min={0} style={{width: '100%'}} />)
  },

  expirationTimeStamp: {
    label: 'Expiration Time',
    initialValue: moment().add(28, 'days'),
    rules: [{
      required: true, message: 'Please enter a name for your contract',
    }],
    extra: 'Placeholder explanation',

    component: (<DatePicker showTime format="YYYY-MM-DD HH:mm:ss" style={{width: '100%'}} />)
  },

  oracleDataSource: {
    label: 'Oraclize.it data source',
    rules: [{
      required: true, message: 'Please enter a name for your contract',
    }],
    extra: 'Placeholder explanation',

    component: (<Input />)
  },

  oracleQuery: {
    label: 'Oraclize.it Query',
    initialValue: 'json(https://api.kraken.com/0/public/Ticker?pair=ETHUSD).result.XETHZUSD.c.0',
    rules: [{
      required: true, message: 'Please enter a name for your contract',
    }],
    extra: 'Placeholder explanation',

    component: (<Input />)
  },

  oracleQueryRepeatSeconds: {
    label: 'Query Repeat Seconds',
    initialValue: 86400,
    rules: [{
      required: true, message: 'Please enter a name for your contract',
    }],
    extra: 'Placeholder explanation',

    component: (<InputNumber min={0} style={{width: '100%'}}/>)
  },
};

function DeployContractField(props) {
  const { name, form } = props;
  const { getFieldDecorator } = form;
  const fieldSettings = fieldSettingsByName[name];

  return (
    <FormItem
      label={fieldSettings.label}
      extra={fieldSettings.extra}
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
