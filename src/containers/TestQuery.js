import { connect } from 'react-redux';

import Contracts from '../Contracts.js';
import { testQuery } from '../actions/testQuery';
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
      dispatch(testQuery({
        web3: store.getState().web3.web3Instance,
        querySpecs
      }, Contracts));
    }
  };
};

const TestQueryFormContainer = connect(mapStateToProps, mapDispatchToProps)(TestQueryForm);

export default TestQueryFormContainer;
