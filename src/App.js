import { Layout } from 'antd';
import React, { Component } from 'react';
import { Route, Router } from 'react-router';

import Header from './components/Header';

import { routes } from './routes';

import './less/App.less';

const { Footer, Content } = Layout;

class App extends Component {
  componentWillMount() {
    if (localStorage) {
      localStorage.setItem('showWelcomeMessage', true);
    }
  }

  render() {
    return (
      <Router history={this.props.history}>
        <Layout style={{ minHeight: '100vh' }}>
          <Header />
          <Content>
            {routes.map(route => <Route key={route.path} {...route} />)}
          </Content>

          <Footer className="footer">
            dApp ©2018 Created by
            <a
              href="https://marketprotocol.io"
              target="_blank"
              rel="noopener noreferrer"
            >
              MARKET Protocol
            </a>
          </Footer>
        </Layout>
      </Router>
    );
  }
}

export default App;
