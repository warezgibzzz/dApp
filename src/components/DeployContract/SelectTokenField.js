import { Form, Icon, Select, Popover } from 'antd';
import React from 'react';
import { getExchangeObj } from './ExchangeSources';

const FormItem = Form.Item;
const Option = Select.Option;

const Hint = props => (
  <Popover
    content={props.hint}
    title={'More about `' + props.hintTitle + '`'}
    trigger="click"
  >
    <Icon type="question-circle-o" style={{ cursor: 'pointer' }} />
  </Popover>
);

class SelectTokenField extends React.Component {
  constructor() {
    super();
    this.state = { pairs: [] };
    this.updateList = this.updateList.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.exchange !== newProps.exchange) {
      this.setState({ pairs: [] });
      this.props.onSelect({
        contractName: '',
        oracleQuery: '',
        priceDecimalPlaces: '',
        priceCap: '',
        priceFloor: '',
        qtyMultiplier: '',
        oracleDataSource: ''
      });
      getExchangeObj(newProps.exchange)
        .fetchList()
        .subscribe(this.updateList);
    }
  }

  updateList(symbols) {
    this.setState({ pairs: symbols });
  }

  handleSelect(e) {
    const exchange = getExchangeObj(this.props.exchange);
    const symbol = this.state.pairs[e];
    this.props.onSelect({
      contractName: this.genContractName(symbol),
      oracleQuery: exchange.genOracleQuery(symbol),
      priceDecimalPlaces: symbol.priceDecimalPlaces,
      priceCap: Math.round(
        symbol.price * 1.5 * 10 ** symbol.priceDecimalPlaces
      ),
      priceFloor: Math.round(
        symbol.price * 0.5 * 10 ** symbol.priceDecimalPlaces
      ),
      qtyMultiplier: 10 ** (18 - symbol.priceDecimalPlaces),
      oracleDataSource: 'URL'
    });
  }

  genContractName(symbol) {
    return `${this.props.exchange}_${symbol.symbol}_${
      symbol.quoteAsset
    }_${Date.now()}`;
  }

  componentDidMount() {
    getExchangeObj(this.props.exchange)
      .fetchList()
      .subscribe(this.updateList);
  }

  render() {
    const { name, form, initialValue, showHint } = this.props;
    const { getFieldDecorator } = form;
    const fieldSettings = {
      label: 'Select ETH based pair',
      extra: 'Available ETH based pairs from exchange'
    };

    const rules = [
      {
        required: true,
        message: 'Please select a token pairs'
      }
    ];
    const label = (
      <span>
        {fieldSettings.label}{' '}
        {showHint && (
          <Hint hint={fieldSettings.extra} hintTitle={fieldSettings.label} />
        )}
      </span>
    );
    return (
      <FormItem label={label}>
        {getFieldDecorator(name, {
          initialValue,
          rules
        })(
          <Select onSelect={this.handleSelect}>
            {this.state.pairs.map((symbol, index) => (
              <Option key={index} value={index}>
                {symbol.symbol}
              </Option>
            ))}
          </Select>
        )}
      </FormItem>
    );
  }
}

export default SelectTokenField;
