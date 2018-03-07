import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

class NavItem extends Component {
  render () {
    const { location, to, children } = this.props;
    let isActive = location.pathname === to;

    return (
      <li className={isActive ? 'ant-menu-item ant-menu-item-selected' : 'ant-menu-item'}>
        <Link to={to}>{children}</Link>
      </li>
    );
  }
}

NavItem = withRouter(NavItem);

export default NavItem;
