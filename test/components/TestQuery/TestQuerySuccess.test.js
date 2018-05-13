import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import TestQuerySuccess from '../../../src/components/TestQuery/TestQuerySuccess';

describe('TestQuerySuccess', () => {

  it('should render transaction link to rinkeby etherscan successfully', () => {
    const testQuerySuccess = shallow(<TestQuerySuccess network={'rinkeby'} txHash={'0xede89'}/>);
    const expectedUrl = `https://rinkeby.etherscan.io/tx/0xede89`;

    expect(testQuerySuccess.find('a').prop('href')).to.equal(expectedUrl);
  });

});
