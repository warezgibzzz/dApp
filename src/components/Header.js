import { Affix, Menu } from 'antd';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import logo from '../img/market-logo-white.png';
import '../less/Header.less';

const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;

const subMenuItems = [
  { Name: 'Simplified Deploy', to: '/contract/deploy?mode=simplified' },
  { Name: 'Guided Deploy', to: '/contract/deploy?mode=guided' },
  { Name: 'Quick Deploy', to: '/contract/deploy?mode=quick' }
];

const mainMenuItems = [
  { Name: 'Explore Contracts', to: '/contract/explorer' },
  { Name: 'Find Contracts', to: '/contract/find' },
  { Name: 'Test Query', to: '/test' },
  {
    Name: 'Documentation',
    to: 'http://docs.marketprotocol.io',
    target: '_blank'
  }
];

class Header extends Component {
  state = {
    selected: ''
  };

  onClick = e => {
    this.setState({ selected: e.key });
  };

  render() {
    return (
      <Affix>
        <header id="header" className="clearfix">
          <div className="ant-row">
            <div className="ant-col-xs-24 ant-col-sm-24 ant-col-md-6 ant-col-lg-5 ant-col-xl-5 ant-col-xxl-4">
              <Link to="/" id="logo" onClick={this.onClick}>
                <img src={logo} alt="Market Protocol Logo" />
              </Link>
            </div>
            <div className="ant-col-xs-0 ant-col-sm-0 ant-col-md-18 ant-col-lg-19 ant-col-xl-19 ant-col-xxl-20">
              <Menu
                mode="horizontal"
                className="menu-site"
                id="nav"
                selectedKeys={[this.state.selected]}
              >
                <SubMenu title="Deploy Contracts">
                  {subMenuItems.map(item => (
                    <MenuItem key={item.to} onClick={this.onClick}>
                      <Link to={item.to}>{item.Name}</Link>
                    </MenuItem>
                  ))}
                </SubMenu>
                {mainMenuItems.map(item => (
                  <MenuItem key={item.to} onClick={this.onClick}>
                    <Link to={item.to} target={item.target}>
                      {item.Name}
                    </Link>
                  </MenuItem>
                ))}
              </Menu>
            </div>
          </div>
        </header>
      </Affix>
    );
  }
}

export default Header;
