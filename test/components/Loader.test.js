import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';

import Loader from '../../src/components/Loader';

describe('Loader', () => {
  it('should be visible with loading set', () => {
    const loader = mount(<Loader loading={true}/>);
    expect(loader.find('img').props('style').style.display).to.not.equals('none');
  });

  it('should not be visible', () => {
    const loader = mount(<Loader loading={false}/>);
    expect(loader.find('img').props('style').style.display).to.equals('none');
  });

  it('should be in the center', () => {
    const loader = mount(<Loader center={true}/>);
    expect(loader.find('img').props('style').className).to.equals('page-loader');
  });
});
