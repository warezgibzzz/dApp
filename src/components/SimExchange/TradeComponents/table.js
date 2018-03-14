import React, { Component } from 'react';

import { Table } from 'antd';

import columns from '../columns';

import './table.css';

class OrdersTable extends Component {
  constructor() {
    super();

    this.onRowSelect = this.onRowSelect.bind(this);
  }

  onRowSelect(record) {
    this.props.onRowSelect(record);
  }

  render() {
    return (
      <Table
        onRow={(order) => ({
          onClick: () => this.onRowSelect(order)
        })}
        pagination={false}
        title={() => this.props.title}
        size="small"
        dataSource={this.props.data}
        columns={columns}
        rowKey="orderHash"
      />
    );
  }
}

export default OrdersTable;
