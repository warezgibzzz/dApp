import React from 'react';

function TestQuerySuccess({ network, txHash }) {
  let link;

  switch (network) {
    case 'rinkeby':
      link = (
        <a
          href={`https://rinkeby.etherscan.io/tx/${txHash}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {' '}
          View on Etherscan
        </a>
      );
      break;
    case 'mainnet':
      link = (
        <a
          href={`https://etherscan.io/tx/${txHash}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {' '}
          View on Etherscan
        </a>
      );
      break;
    default:
      link = txHash;
      break;
  }

  return <span>Transaction has been submitted: {link}</span>;
}

export default TestQuerySuccess;
