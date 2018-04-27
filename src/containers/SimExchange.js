import { connect } from 'react-redux';

import store from '../store';
import Contracts from '../Contracts.js';

import SimExchangeComponent from '../components/SimExchange/SimExchange';
import { loadContracts } from '../actions/explorer';
import CreateInitializer, {
  contractConstructor
} from '../util/web3/contractInitializer';
import { processContractsList } from '../util/utils';
import {
  getContractAsks,
  getContractBids,
  selectContract,
  tradeOrder
} from '../actions/simExchange';

const mapStateToProps = state => ({
  contracts: state.explorer.contracts,
  ...state.simExchange
});

const mapDispatchToProps = dispatch => ({
  getAsks: () => dispatch(getContractAsks()),
  getBids: () => dispatch(getContractBids()),
  getContracts: () => {
    const web3 = store.getState().web3.web3Instance;
    const initializeContracts = CreateInitializer(
      contractConstructor.bind(null, web3)
    );
    const contracts = initializeContracts(Contracts);
    const processContracts = processContractsList.bind(
      null,
      contracts.MarketContract,
      contracts.MarketCollateralPool,
      contracts.CollateralToken
    );

    dispatch(
      loadContracts(
        { web3, processContracts },
        {
          MarketContractRegistry: contracts.MarketContractRegistry,
          CollateralToken: contracts.CollateralToken
        }
      )
    );
  },
  selectContract: addr => dispatch(selectContract(addr)),
  tradeOrder: order => dispatch(tradeOrder(order))
});

const SimExchange = connect(mapStateToProps, mapDispatchToProps)(
  SimExchangeComponent
);

export default SimExchange;
