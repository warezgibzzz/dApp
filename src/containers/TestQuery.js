import { connect } from 'react-redux';
import TestQueryForm from '../components/TestQuery/TestQueryForm';
import { testQuery } from '../actions/testQuery';

const mapStateToProps = (state, ownProps) => {
  const { error, loading, results, transaction } = state.testQuery;
  const { network } = state.web3;
  return { error, loading, results, transaction, network };
};

const mapDispatchToProps = dispatch => {
  return {
    onTestQuery: querySpecs => {
      dispatch(testQuery(querySpecs));
    }
  };
};

const TestQueryFormContainer = connect(mapStateToProps, mapDispatchToProps)(TestQueryForm);

export default TestQueryFormContainer;
