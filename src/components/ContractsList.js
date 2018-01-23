import React, { Component } from 'react';

class ContractsList extends Component {
  componentWillMount() {
    this.props.onLoad();
  }

  render() {

    if (!this.props.contracts || this.props.loading) {
      return (
        <div>Loading...</div>
      );
    }

    if (this.props.contracts.length === 0) {
      return (
        <div>No contracts found</div>
      );
    }

    return (
      <div>
        Contracts List -- {this.props.contracts.length}
        {this.props.contracts.map(c => (
          <div key={c.CONTRACT_NAME}>Name --- {c.CONTRACT_NAME}</div>
        ))}
      </div>
    );
  }
}

export default ContractsList;
