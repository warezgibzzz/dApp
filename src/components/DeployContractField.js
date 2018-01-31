import React from 'react';
import moment from 'moment';

import { Form, Input, Select, InputNumber, DatePicker } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

const ethAddressValidator = (rule, value, callback) => {
  const web3 = window.web3;

  // If web3 isn't set up for some reason, we probably shouldn't block validation
  if(!web3) callback();

  callback(web3.isAddress(value) ? undefined : 'Invalid ETH address');
};

const timestampValidator = (rule, value, callback) => {
  callback(value > moment() ? undefined : 'Expiration must be in the future');
};

const priceFloorValidator = (form, rule, value, callback) => {
  const priceCap = form.getFieldValue('priceCap');

  callback(value <= priceCap ? undefined : 'Price floor must be less-than or equal to the price cap');
};

const priceCapValidator = (form, rule, value, callback) => {
  const priceFloor = form.getFieldValue('priceFloor');

  callback(value >= priceFloor ? undefined : 'Price cap must be greater-than or equal to the price floor');
};

const fieldSettingsByName = {
  contractName: {
    label: 'Name',
    initialValue: 'ETH/BTC',
    rules: [{
      required: true, message: 'Please enter a name for your contract',
    }],
    extra: 'Placeholder explanation',

    component: () => (<Input />)
  },

  baseTokenAddress: {
    label: 'Base Token Address',
    initialValue: '0x3333333333333333333333333333333333333333',
    rules: [
      {
        required: true, message: 'Please enter a base token address',
      },
      {
        validator: ethAddressValidator
      }
    ],
    extra: 'Placeholder explanation',

    component: () => (<Input />)
  },

  priceFloor: {
    label: 'Price Floor',
    initialValue: 0,
    rules: (form) => {
      return [
        {
          required: true, message: 'Please enter a price floor',
        },
        {
          validator: (rule, value, callback) => {
            priceFloorValidator(form, rule, value, callback);
          },
        }
      ];
    },
    extra: 'Placeholder explanation',

    component: ({ form }) => {
      return (
        <InputNumber
          min={0}
          style={{ width: '100%' }}
          onChange={() => {
            setTimeout(() => {
              form.validateFields(['priceCap'], { force: true });
            }, 100);
          }}
        />
      );
    }
  },

  priceCap: {
    label: 'Price Cap',
    initialValue: 150,
    rules: (form) => {
      return [
        {
          required: true, message: 'Please enter a price cap',
        },
        {
          validator: (rule, value, callback) => {
            priceCapValidator(form, rule, value, callback);
          },
        }
      ];
    },
    extra: 'Placeholder explanation',

    component: ({ form }) => {
      return (
        <InputNumber
          min={0}
          style={{ width: '100%' }}
          onChange={() => {
            setTimeout(() => {
              form.validateFields(['priceFloor'], { force: true });
            }, 100);
          }}
        />
      );
    }
  },

  priceDecimalPlaces: {
    label: 'Price Decimal Places',
    initialValue: 2,
    rules: [
      {
        required: true, message: 'Please enter the number of decimal places of the price',
      },
      {
        type: 'integer', message: 'Value must be an integer'
      }
    ],
    extra: 'Placeholder explanation',

    component: () => (<InputNumber min={0} style={{ width: '100%' }} />)
  },

  qtyDecimalPlaces: {
    label: 'Qty Decimal Places',
    initialValue: 2,
    rules: [
      {
        required: true, message: 'Please enter the number of decimal places of the quantity',
      },
      {
        type: 'integer', message: 'Value must be an integer'
      }
    ],
    extra: 'Placeholder explanation',

    component: () => (<InputNumber min={0} style={{ width: '100%' }} />)
  },

  expirationTimeStamp: {
    label: 'Expiration Time',
    initialValue: moment().add(28, 'days'),
    rules: [
      {
        required: true, message: 'Please enter an expiration time',
      },
      {
        validator: timestampValidator
      }
    ],
    extra: 'Placeholder explanation',

    component: () => (<DatePicker showTime format="YYYY-MM-DD HH:mm:ss" style={{ width: '100%' }} />)
  },

  oracleDataSource: {
    label: 'Oraclize.it data source',
    initialValue: 'URL',
    rules: [
      {
        required: true, message: 'Please select a data source',
      }
    ],
    extra: 'Placeholder explanation',

    component: () => {
      return (
        <Select>
          <Option value="URL">URL</Option>
          <Option value="WolframAlpha">Wolfram Alpha</Option>
          <Option value="IPFS">IPFS</Option>
        </Select>
      );
    }
  },

  oracleQuery: {
    label: 'Oraclize.it Query',
    initialValue: 'json(https://api.kraken.com/0/public/Ticker?pair=ETHUSD).result.XETHZUSD.c.0',
    rules: [{
      required: true, message: 'Please enter a valid query',
    }],
    extra: 'Placeholder explanation',

    component: () => (<Input />)
  },

  oracleQueryRepeatSeconds: {
    label: 'Query Repeat Seconds',
    initialValue: 86400,
    rules: [
      {
        required: true, message: 'Please enter the number of seconds before repeating the query',
      },
      {
        type: 'integer', message: 'Value must be an integer'
      }
    ],
    extra: 'Placeholder explanation',

    component: () => (<InputNumber min={0} style={{ width: '100%' }}/>)
  },
};

function DeployContractField(props) {
  const { name, form } = props;
  const { getFieldDecorator } = form;
  const fieldSettings = fieldSettingsByName[name];

  const rules = typeof fieldSettings.rules === 'function' ? fieldSettings.rules(form) : fieldSettings.rules;

  return (
    <FormItem
      label={fieldSettings.label}
      extra={fieldSettings.extra}
    >
      {getFieldDecorator(name, {
        initialValue: fieldSettings.initialValue,
        rules,
      })(
        fieldSettings.component({
          form,
          fieldSettings,
        })
      )}
    </FormItem>
  );
}

export default DeployContractField;
