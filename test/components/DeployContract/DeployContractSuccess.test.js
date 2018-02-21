import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import DeployContractSuccess from '../../../src/components/DeployContract/DeployContractSuccess';

describe('DepoloyContractSuccess', () => {
  it('should render link to etherscan successfully', () => {
    const contract = {
      address: '0x8888888888888888'
    };
    const deployContractSuccess = shallow(<DeployContractSuccess contract={contract}/>);
    const expectedUrl = `https://etherscan.io/address/${contract.address}`;
    
    expect(deployContractSuccess.find('a').prop('href')).to.equal(expectedUrl);
  });


});
