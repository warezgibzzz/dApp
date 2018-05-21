import { connect } from 'react-redux';

import LandingComponent from '../components/Landing';
import withGAPageView from './GoogleAnalyticsTracker';

const mapStateToProps = state => {
  const { network } = state.web3;

  return {
    network
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

const Landing = withGAPageView(
  connect(mapStateToProps, mapDispatchToProps)(LandingComponent)
);

export default Landing;
