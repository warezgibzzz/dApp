import { connect } from "react-redux";

import store from "../store";
import Contracts from '../Contracts.js';

import SimExchangeComponent from "../components/SimExchange/SimExchange";
import { loadContracts } from "../actions/explorer";
import { getContractAsks, getContractBids, selectContract, tradeOrder } from "../actions/simExchange";

const mapStateToProps = state => ({
  contracts: state.explorer.contracts,
  ...state.simExchange,
});

const mapDispatchToProps = dispatch => ({
  getAsks: () => dispatch(getContractAsks()),
  getBids: () => dispatch(getContractBids()),
  getContracts: () => dispatch(loadContracts({
    web3: store.getState().web3.web3Instance
  }, Contracts)),
  selectContract: (addr) => dispatch(selectContract(addr)),
  tradeOrder: (order) => dispatch(tradeOrder(order))
});

const SimExchange = connect(mapStateToProps, mapDispatchToProps)(SimExchangeComponent);

export default SimExchange;
