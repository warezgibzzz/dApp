import { connect } from 'react-redux';

import Contracts from '../Contracts.js';
import { loadContracts } from '../actions/explorer';
import ContractsList from '../components/ContractsList';
import store from '../store';

const mapStateToProps = state => ({
  ...state.explorer,
});

const mapDispatchToProps = dispatch => ({
  onLoad: () => dispatch(loadContracts({
    web3: store.getState().web3.web3Instance
  }, Contracts))
});

const Explorer = connect(mapStateToProps, mapDispatchToProps)(ContractsList);

export default Explorer;
