import { connect } from "react-redux";

import ContractsList from "../components/ContractsList";
import { loadContracts } from "../actions/explorer";
import store from "../store";
import Contracts from '../Contracts.js';

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
