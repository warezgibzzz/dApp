import { connect } from 'react-redux';
import TestQueryForm from '../components/TestQuery/TestQueryForm';
import { testQuery } from '../actions/testQuery';
import store from "../store";
import Contracts from '../Contracts.js';

const mapStateToProps = (state, ownProps) => {
  const { error, loading, results, transaction } = state.testQuery;
  const { network } = state.web3;
  console.log('Error', error && error.error);
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
