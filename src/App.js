import { Layout } from 'antd';
import 'antd/dist/antd.min.css';
import React, { Component } from 'react';
import { Route, Router } from 'react-router';

import './App.css';
import Header from './components/Header';
import './css/open-sans.css';
import './css/oswald.css';
import { routes } from './routes';

const {Footer, Content} = Layout;

class App extends Component {
  render() {
    return (
      <Router history={this.props.history}>
        <Layout style={{minHeight: '100vh', backgroundColor: '#F8F8F8'}}>
          <Header/>
          <Content>
            {routes.map((route) => (
              <Route key={route.path} {...route} />
            ))}
          </Content>

          <Footer className="footer">
            dApp ©2018 Created by <a href="https://marketprotocol.io" target="_blank" rel="noopener noreferrer">MARKET
            Protocol</a>
          </Footer>
        </Layout>
      </Router>
    );
  }
}

export default App;
