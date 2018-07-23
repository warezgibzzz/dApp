import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import sinon from 'sinon';
import { from } from 'rxjs';

import { Form, Select } from 'antd';
import SelectTokenField from '../../../src/components/DeployContract/SelectTokenField';
import ExchangeSources from '../../../src/components/DeployContract/ExchangeSources';

let FormSelectTokenField = Form.create()(SelectTokenField);

ExchangeSources.push({
  key: 'TEX1',
  name: 'TestExchange1',
  genOracleQuery(symbol) {
    return `json(https://api.test.com/v1/pubticker/${
      symbol.symbol
    }).last_price`;
  },
  fetchList(quotes) {
    return from([
      [{ symbol: 'ETHUSDT', priceDecimalPlaces: 5, quoteAsset: 'USDT' }]
    ]);
  }
});

ExchangeSources.push({
  key: 'TEX2',
  name: 'TestExchange2',
  genOracleQuery(symbol) {
    return `json(https://api.test.com/v1/pubticker/${
      symbol.symbol
    }).last_price`;
  },
  getPrice(symbol) {
    return from([1]);
  },
  fetchList(quotes) {
    return from([
      [{ symbol: 'ETHUSDT', priceDecimalPlaces: 5, quoteAsset: 'USDT' }]
    ]);
  }
});

describe('SelectTokenField', () => {
  let onSelectSpy;
  beforeEach(() => {
    onSelectSpy = sinon.spy();
  });

  it('should render a select', () => {
    let selectTokenField = mount(
      <FormSelectTokenField
        name="tokenPair"
        exchange="TEX1"
        onSelect={onSelectSpy}
      />
    );
    expect(selectTokenField.find(Select)).to.have.length(1);
  });

  it('should called onSelect when select (without getPrice)', () => {
    let selectTokenField = mount(
      <FormSelectTokenField
        name="tokenPair"
        exchange="TEX1"
        onSelect={onSelectSpy}
      />
    );
    selectTokenField
      .find(Select)
      .instance()
      .props.onSelect(0);
    expect(onSelectSpy).to.have.property('callCount', 1);
  });

  it('should called onSelect when select (with getPrice)', () => {
    let selectTokenField = mount(
      <FormSelectTokenField
        name="tokenPair"
        exchange="TEX2"
        onSelect={onSelectSpy}
      />
    );
    selectTokenField
      .find(Select)
      .instance()
      .props.onSelect(0);
    expect(onSelectSpy).to.have.property('callCount', 1);
  });
});
