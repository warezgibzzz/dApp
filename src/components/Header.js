import { Menu } from 'antd';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import logo from '../img/market-logo-small.png';
import './Header.css';
import NavItem from './NavItem';

const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;

class Header extends Component {
  render() {
    return (
      <header id="header" className="clearfix">
        <div className="ant-row">
          <div className="ant-col-xs-24 ant-col-sm-24 ant-col-md-6 ant-col-lg-5 ant-col-xl-5 ant-col-xxl-4">
            <Link to="http://www.marketprotocol.io" target="_blank" id="logo">
              <img src={logo} alt="Market Protocol Logo" />
            </Link>
          </div>
          <div className="ant-col-xs-0 ant-col-sm-0 ant-col-md-18 ant-col-lg-19 ant-col-xl-19 ant-col-xxl-20">
              <Menu mode="horizontal" className="menu-site" id="nav">
                <SubMenu title="Deploy Contracts">
                  <NavItem to="/contract/deploy?mode=quick">Quick Deploy</NavItem>
                  <NavItem to="/contract/deploy?mode=guided">Guided Deploy</NavItem>
                </SubMenu>
                <NavItem to="/contract/explorer">Explore Contracts</NavItem>
                <NavItem to="/contract/find">Find Contracts</NavItem>
                <NavItem to="/test">Test Query</NavItem>
                <NavItem to="/exchange">Sim Exchange</NavItem>
                <MenuItem>
                  <Link to="http://docs.marketprotocol.io" target="_blank">Documentation</Link>
                </MenuItem>
              </Menu>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;



