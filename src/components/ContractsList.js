import { Col, Input, Row, Table, Select, Popover } from 'antd';
import { formatedTimeFrom } from '../util/utils';
import React, { Component } from 'react';

import '../less/ContractsList.less';
import Loader from './Loader';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const Search = Input.Search;
// Example Contract
/* {
  "COLLATERAL_TOKEN": "0xa4392264a2d8c998901d10c154c91725b1bf0158",
  "CONTRACT_NAME": "ETHXBT",
  "ORACLE_QUERY": "json(https://api.kraken.com/0/public/Ticker?pair=ETHUSD).result.XETHZUSD.c.0",
  "PRICE_CAP": "60465",
  "PRICE_DECIMAL_PLACES": "2",
  "PRICE_FLOOR": "20155",
  "QTY_MULTIPLIER": "10",
  "collateralPoolBalance": "0",
  "isSettled": true,
  "lastPrice": "105700"
} */
const Option = Select.Option;
class ContractsList extends Component {
  state = {
    filters: null,
    sort: null,
    contracts: this.props.contracts
  };

  componentWillMount() {
    if (!this.props.contracts) {
      this.props.onLoad();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.contracts !== this.state.contracts) {
      this.setState({ contracts: nextProps.contracts });
    }
  }

  resetSearchFilter() {
    this.setState({
      contractFiltered: false,
      tokenFiltered: false,
      oracleFiltered: false
    });
  }

  handleChange = (pagination, filters, sorter) => {
    this.setState({
      filters: filters,
      sort: sorter
    });
  };

  onInputChange = (e, searchKey) => {
    this.setState({ [searchKey]: e.target.value });
  };

  onSearch = (dataKey, searchKey, searchVisibleKey, filteredKey) => {
    const searchText = this.state[searchKey];
    const reg = new RegExp(searchText, 'gi');
    this.resetSearchFilter();
    this.setState({
      [searchVisibleKey]: false,
      [filteredKey]: !!searchText,
      contracts: this.props.contracts
        .map(record => {
          const match = record[dataKey].match(reg);
          if (!match) {
            return null;
          }
          return record;
        })
        .filter(record => !!record)
    });
  };

  render() {
    let { sort, filters, contracts } = this.state;
    sort = sort || {};
    filters = filters || {};
    contracts = contracts || [];

    let collateralTokenSymbols = [
      ...new Set(contracts.map(item => item.COLLATERAL_TOKEN_SYMBOL))
    ].map(item => {
      return { value: item, text: item };
    });
    console.log(filters);
    const columns = [
      {
        title: 'Name',
        dataIndex: 'CONTRACT_NAME',
        width: 200,
        sorter: (a, b) => {
          return a.CONTRACT_NAME.localeCompare(b.CONTRACT_NAME);
        },
        sortOrder: sort.columnKey === 'CONTRACT_NAME' && sort.order,

        contractSearchVisible: this.state.contractSearchVisible,
        onFilterDropdownVisibleChange: visible => {
          this.setState(
            {
              contractSearchVisible: visible
            },
            () =>
              this.contractNameSearchInput &&
              this.contractNameSearchInput.focus()
          );
        }
      },
      {
        title: 'Base Token',
        dataIndex: 'COLLATERAL_TOKEN',
        width: 150,

        tokenSearchVisible: this.state.tokenSearchVisible,
        onFilterDropdownVisibleChange: visible => {
          this.setState(
            {
              tokenSearchVisible: visible
            },
            () =>
              this.collateralTokenSearchInput &&
              this.collateralTokenSearchInput.focus()
          );
        }
      },
      {
        title: 'Symbol',
        dataIndex: 'COLLATERAL_TOKEN_SYMBOL',
        width: 150,

        render: (text, row, index) => {
          return text;
        },

        filteredValue: filters.COLLATERAL_TOKEN_SYMBOL || null,
        onFilter: (value, record) =>
          record.COLLATERAL_TOKEN_SYMBOL.includes(value)
      },
      {
        title: 'Oracle Query',
        dataIndex: 'ORACLE_QUERY',
        width: 300,
        oracleSearchVisible: this.state.oracleSearchVisible,
        onFilterDropdownVisibleChange: visible => {
          this.setState(
            {
              oracleSearchVisible: visible
            },
            () =>
              this.oracleQuerySearchInput && this.oracleQuerySearchInput.focus()
          );
        }
      },

      {
        title: 'Balance',
        dataIndex: 'collateralPoolBalance',
        width: 120,

        sorter: (a, b) => a.collateralPoolBalance - b.collateralPoolBalance,
        sortOrder: sort.columnKey === 'collateralPoolBalance' && sort.order
      },
      {
        title: 'Expiration',
        dataIndex: 'EXPIRATION',
        width: 200,
        render: (text, row, index) => {
          let formatedTime = formatedTimeFrom(text);
          return formatedTime.includes('s') ? (
            <span style={{ color: '#E41640' }}>{formatedTime}</span>
          ) : (
            formatedTime
          );
        },
        sorter: (a, b) => a.EXPIRATION - b.EXPIRATION,
        sortOrder: sort.columnKey === 'EXPIRATION' && sort.order
      },
      {
        title: '',
        render: (text, record, index) => {
          let rowrender = (
            <div>
              <Row style={{ padding: '14px' }}>
                <Col>
                  <strong>Address </strong> {record.key}
                </Col>
                <Col>
                  <strong>Token </strong> {record.COLLATERAL_TOKEN_ADDRESS}
                </Col>
                <Col>
                  <strong>Price Cap </strong> {record.PRICE_CAP}
                </Col>
                <Col>
                  <strong>Price Decimal Places </strong>{' '}
                  {record.PRICE_DECIMAL_PLACES}
                </Col>
                <Col>
                  <strong>Qty Multiplier </strong> {record.QTY_MULTIPLIER}
                </Col>
                <Col>
                  <strong>Price Floor </strong> {record.PRICE_FLOOR}
                </Col>
                <Col>
                  <strong>Last Price </strong> {record.lastPrice}
                </Col>
              </Row>
              <CopyToClipboard text={record.ORACLE_QUERY}>
                <button className="copyOrcaleQuery">Copy Orcale Query</button>
              </CopyToClipboard>
            </div>
          );
          return (
            <Popover
              overlayClassName={'contractPopOver'}
              content={rowrender}
              placement={'bottomLeft'}
              trigger="click"
            >
              <div role="button" className="dotdotdot" tabIndex="0" Save>
                <span className="dot" />
                <span className="dot" />
                <span className="dot" />
              </div>
            </Popover>
          );
        }
      }
    ];

    if (!this.state.contracts) {
      return <Loader />;
    }
    let table = (
      <Table
        columns={columns}
        dataSource={this.state.contracts}
        onChange={this.handleChange}
        pagination={{ pageSize: 25 }}
        // scroll={{ y: '60vh' }}
      />
    );

    if (this.state.contracts.length === 0) {
      table = <div>No contracts found</div>;
    }

    return (
      <div className="page contractPage" style={{ margin: '0 13%' }}>
        <Row style={{ padding: '30px 20px' }} gutter={16}>
          <Col span={8}>
            <div>
              <Search
                ref={ele => (this.contractNameSearchInput = ele)}
                placeholder="Search Contract Name"
                value={this.state['CONTRACT_NAME_SEARCH_TEXT']}
                onChange={e =>
                  this.onInputChange(e, 'CONTRACT_NAME_SEARCH_TEXT')
                }
                onPressEnter={() =>
                  this.onSearch(
                    'CONTRACT_NAME',
                    'CONTRACT_NAME_SEARCH_TEXT',
                    'contractSearchVisible',
                    'contractFiltered'
                  )
                }
              />
            </div>
          </Col>
          <Col span={4}>
            <Select
              mode="multiple"
              style={{ width: 200 }}
              placeholder="All Tokens"
              showArrow={true}
              optionFilterProp="children"
              onChange={values =>
                this.setState({ filters: { COLLATERAL_TOKEN_SYMBOL: values } })
              }
            >
              {collateralTokenSymbols.map(e => (
                <Option key={e.value} value={e.value}>
                  {e.text}
                </Option>
              ))}
            </Select>
          </Col>
        </Row>

        <Row style={{ padding: '0px 20px' }}>{table}</Row>
      </div>
    );
  }
}

export default ContractsList;
