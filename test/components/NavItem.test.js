import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router';
import { expect } from 'chai';

import NavItem from '../../src/components/NavItem';

describe('NavItem', () => {
  const activeClass = 'ant-menu-item ant-menu-item-selected';
  const inactiveClass = 'ant-menu-item';

  it('should be active if to == pathname', () => {
    const pathname = '/';
    const to = '/';
    const loader = mount(<MemoryRouter initialEntries={[ { pathname, key: 'start' } ]}>
      <NavItem to={to}>
        <div>Hi</div>
      </NavItem>
    </MemoryRouter>);

    expect(loader.find('li').hasClass(activeClass)).to.equal(true);
  });

  it('should be inactive if to != pathname', () => {
    const pathname = '/';
    const to = '/notPathname';
    const loader = mount(<MemoryRouter initialEntries={[ { pathname, key: 'start' } ]}>
      <NavItem to={to}>
        <div>Hi</div>
      </NavItem>
    </MemoryRouter>);

    expect(loader.find('li').hasClass(inactiveClass)).to.equal(true);
  });
});