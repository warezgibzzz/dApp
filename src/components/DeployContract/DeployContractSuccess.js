import React from 'react';

function DeployContractSuccess({ contract }) {
  return (
    <span>
      Contract successfully deployed at:{' '}
      <a
        href={`https://etherscan.io/address/${contract.address}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {contract.address}
      </a>
    </span>
  );
}

export default DeployContractSuccess;
