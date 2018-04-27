import { Affix, Menu } from 'antd';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import logo from '../img/market-logo-white.png';
import '../less/Header.less';

const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;

class Header extends Component {
  render() {
    return (
      <Affix>
        <header id="header" className="clearfix">
          <div className="ant-row">
            <div className="ant-col-xs-24 ant-col-sm-24 ant-col-md-6 ant-col-lg-5 ant-col-xl-5 ant-col-xxl-4">
              <Link to="/" id="logo">
                <img src={logo} alt="Market Protocol Logo" />
              </Link>
            </div>
            <div className="ant-col-xs-0 ant-col-sm-0 ant-col-md-18 ant-col-lg-19 ant-col-xl-19 ant-col-xxl-20">
              <Menu mode="horizontal" className="menu-site" id="nav">
                <SubMenu title="Deploy Contracts">
                  <MenuItem>
                    <Link to="/contract/deploy?mode=quick">Quick Deploy</Link>
                  </MenuItem>
                  <MenuItem>
                    <Link to="/contract/deploy?mode=guided">Guided Deploy</Link>
                  </MenuItem>
                </SubMenu>
                <MenuItem>
                  <Link to="/contract/explorer">Explore Contracts</Link>
                </MenuItem>
                <MenuItem>
                  <Link to="/contract/find">Find Contracts</Link>
                </MenuItem>
                <MenuItem>
                  <Link to="/test">Test Query</Link>
                </MenuItem>
                {/*<MenuItem><Link to="/exchange">Sim Exchange</Link></MenuItem>*/}
                <MenuItem>
                  <Link to="http://docs.marketprotocol.io" target="_blank">
                    Documentation
                  </Link>
                </MenuItem>
              </Menu>
            </div>
          </div>
        </header>
      </Affix>
    );
  }
}

export default Header;
