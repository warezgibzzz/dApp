import { connect } from 'react-redux';
import TestQueryForm from '../components/TestQuery/TestQueryForm';
import { testQuery } from '../actions/testQuery';

const mapStateToProps = (state, ownProps) => {
  const { error, loading, results } = state.testQuery;
  return { error, loading, results };
};

const mapDispatchToProps = dispatch => {
  return {
    onTestQuery: querySpecs => {
      dispatch(testQuery(querySpecs))
    }
  };
};

const TestQueryFormContainer = connect(mapStateToProps, mapDispatchToProps)(TestQueryForm);

export default TestQueryFormContainer;
