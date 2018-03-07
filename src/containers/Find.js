import { connect } from 'react-redux';

import Contracts from '../Contracts.js';
import { findContract } from '../actions/find';
import FindContractForm from '../components/FindContract/FindContractForm';
import store from '../store';

const mapStateToProps = state => {
  const { loading, error, contract } = state.find;

  return {
    loading,
    error,
    contract
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFindContract: contractAddress => {
      dispatch(findContract({
        web3: store.getState().web3.web3Instance
      }, contractAddress, Contracts));
    }
  };
};

const Find = connect(mapStateToProps, mapDispatchToProps)(FindContractForm);

export default Find;
