import { connect } from 'react-redux';

import Contracts from '../Contracts.js';
import withGAPageView from './GoogleAnalyticsTracker';
import TestQueryForm from '../components/TestQuery/TestQueryForm';

import { testQuery } from '../actions/testQuery';
import CreateInitializer, {
  contractConstructor
} from '../util/web3/contractInitializer';
import store from '../store';

const mapStateToProps = (state, ownProps) => {
  const { error, loading, results, transaction } = state.testQuery;
  const { network } = state.web3;

  return { error, loading, results, transaction, network };
};

const mapDispatchToProps = dispatch => {
  return {
    onTestQuery: querySpecs => {
      const web3 = store.getState().web3.web3Instance;
      const initializeContracts = CreateInitializer(
        contractConstructor.bind(null, web3)
      );
      dispatch(
        testQuery(
          {
            web3,
            querySpecs
          },
          initializeContracts({ QueryTest: Contracts.QueryTest })
        )
      );
    }
  };
};

const TestQueryFormContainer = connect(mapStateToProps, mapDispatchToProps)(
  withGAPageView(TestQueryForm)
);

export default TestQueryFormContainer;
