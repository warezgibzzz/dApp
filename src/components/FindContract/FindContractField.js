import { Form, Icon, Input, Tooltip } from 'antd';
import React from 'react';

const FormItem = Form.Item;

const ethAddressValidator = (rule, value, callback) => {
  const web3 = window.web3;

  if(!web3) {
    callback();
  } else {
    callback(web3.isAddress(value) ? undefined : 'Invalid ETH address');
  }
};

const Hint = (props) => (<Tooltip title={props.hint} >
                          <Icon type="question-circle-o" />
                        </Tooltip>);

const fieldSettingsByName = {
  marketContractAddress: {
    label: 'MARKET Contract Address',
    initialValue: '0x12345678123456781234567812345678',
    rules: [
      {
        required: true, message: 'Please enter MARKET contract address',
      },
      {
        validator: ethAddressValidator
      }
    ],
    extra: 'Please enter deployed and whitelisted MARKET contract address',

    component: () => (<Input />)
  },
};

function FindContractField(props) {
  const { name, form, initialValue, showHint } = props;
  const { getFieldDecorator } = form;
  const fieldSettings = fieldSettingsByName[name];

  const rules = typeof fieldSettings.rules === 'function' ? fieldSettings.rules(form) : fieldSettings.rules;
  const label = (<span>{fieldSettings.label} {showHint && <Hint hint={fieldSettings.extra}/>}</span>);
  return (
    <FormItem
      label={label}
    >

      {getFieldDecorator(name, {
        initialValue,
        rules,
      })(
        fieldSettings.component({
          form,
          fieldSettings,
          showHint
        })
      )}
    </FormItem>
  );
}

export const FieldSettings = fieldSettingsByName;
export default FindContractField;
