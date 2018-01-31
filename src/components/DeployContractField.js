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
    extra: 'The contract name should be as descriptive as possible capturing the underlying asset relationship ' +
    'as well as possibly the expiration.  Something like "ETH/BTC-20180228-Kraken" may help others understand ' +
    'the underlying asset, the data source, and expiration date in a nice human readable and searchable way.  ' +
    'In the future, we hope to implement a standardized naming spec to assist in this process',

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
    extra: 'This is the token that collateralizes the contract, it can be any valid ERC20 token',

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
    extra: 'The lower bound of price exposure this contract will trade. If the oracle reports a price below this' +
    'value the contract will enter into settlement',

    component: () => (<InputNumber min={0} style={{ width: '100%' }} />)
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
    extra: 'The upper bound of price exposure this contract will trade. If the oracle reports a price above this' +
    'value the contract will enter into settlement',

    component: ({ form }) => {
      return (
        <InputNumber
          min={0}
          style={{ width: '100%' }}
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
    extra: 'Since all numbers must be represented as integers on the Ethereum blockchain, this is how many ' +
    'decimal places one needs to move the decimal in order to go from the oracle query price to an integer.  ' +
    'For instance if the oracle query results returned a value such as 190.22, we need to move the ' +
    'decimal two(2) places to convert to an integer value of 19022.',

    component: () => (<InputNumber min={0} style={{ width: '100%' }} />)
  },

  qtyMultiplier: {
    label: 'Qty Multiplier',
    initialValue: 2,
    rules: [
      {
        required: true, message: 'Please enter a valid quantity multiplier',
      },
      {
        type: 'integer', message: 'Value must be an integer'
      }
    ],
    extra: 'The qty multiplier allows the user to specify how many base units (for ethereum, this would be wei) each' +
    'integer price movement changes the value of the contract.  If our integerized price was 19022 with a qty ' +
    'multiplier of 1, and the price moved to 19023, then the value will have change by 1 wei.  If however the ' +
    'multiplier was set at 1,000,000,000 the price movement of 1 unit would now ' +
    'correspond to a value of 1 gwei (not wei)',

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
    extra: 'Upon reaching the expiration timestamp all open positions will settle to the defined oracle query',

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
    extra: 'Available data sources from Oraclize.it',

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
    extra: 'Properly structured Oraclize.it query, please use the test query page for clarification',

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
    extra: 'Number of seconds in between repeating the oracle query.  Typically this only need be once per day. ' +
    'Additional frequency can be beneficial in some circumstances but will increase the needed amount of ETH that ' +
    'is needs to be pre-funded to the contract in order to pay for the query gas costs',

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
