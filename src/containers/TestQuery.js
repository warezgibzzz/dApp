import { connect } from 'react-redux';

import Contracts from '../Contracts.js';
import { testQuery } from '../actions/testQuery';
import CreateInitializer, { contractConstructor } from '../util/web3/contractInitializer';
import TestQueryForm from '../components/TestQuery/TestQueryForm';
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
      const initializeContracts = CreateInitializer(contractConstructor.bind(null, web3));
      dispatch(testQuery({
        web3,
        querySpecs
      }, initializeContracts({ TestQuery: Contracts.TestQuery })));
    }
  };
};

const TestQueryFormContainer = connect(mapStateToProps, mapDispatchToProps)(TestQueryForm);

export default TestQueryFormContainer;
