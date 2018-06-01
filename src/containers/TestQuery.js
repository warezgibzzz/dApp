import { connect } from 'react-redux';

import Contracts from '../Contracts.js';
import withGAPageView from './GoogleAnalyticsTracker';
import TestQueryForm from '../components/TestQuery/TestQueryForm';

import { getGasEstimate, testQuery } from '../actions/testQuery';
import CreateInitializer, {
  contractConstructor
} from '../util/web3/contractInitializer';
import store from '../store';

const mapStateToProps = (state, ownProps) => {
  const { error, loading, results, transaction, gas } = state.testQuery;
  const { network } = state.web3;

  return { error, loading, results, transaction, network, gas };
};

const mapDispatchToProps = dispatch => {
  const web3 = store.getState().web3.web3Instance;
  const initializeContracts = CreateInitializer(
    contractConstructor.bind(null, web3)
  );

  return {
    onTestQuery: querySpecs => {
      dispatch(
        testQuery(
          {
            web3,
            querySpecs
          },
          initializeContracts({ QueryTest: Contracts.QueryTest })
        )
      );
    },
    getGasEstimate: () => {
      dispatch(
        getGasEstimate(
          { web3 },
          initializeContracts({ QueryTest: Contracts.QueryTest })
        )
      );
    }
  };
};

const TestQueryFormContainer = withGAPageView(
  connect(mapStateToProps, mapDispatchToProps)(TestQueryForm)
);

export default TestQueryFormContainer;
