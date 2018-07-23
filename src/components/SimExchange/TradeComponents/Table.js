import React, { Component } from 'react';
import uniqueId from 'lodash/uniqueId';

import { Table } from 'antd';

import columns from '../Columns';

import './Table.less';

class OrdersTable extends Component {
  render() {
    return (
      <Table
        pagination={false}
        title={() => this.props.title}
        size="small"
        dataSource={this.props.data}
        columns={columns}
        rowKey={() => uniqueId('orderHash')}
      />
    );
  }
}

export default OrdersTable;
