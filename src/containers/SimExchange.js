import { connect } from 'react-redux';

import store from '../store';
import Contracts from '../Contracts.js';

import withGAPageView from './GoogleAnalyticsTracker';
import SimExchangeComponent from '../components/SimExchange/SimExchange';

import { loadContracts } from '../actions/explorer';
import CreateInitializer, {
  contractConstructor
} from '../util/web3/contractInitializer';
import { processContractsList } from '../util/contracts';
import { selectContract } from '../actions/simExchange';

const mapStateToProps = state => ({
  contracts: state.explorer.contracts,
  simExchange: state.simExchange,
  web3: state.web3,
  marketjs: state.marketjs,
  shouldRender: true,
  ...state.simExchange
});

const mapDispatchToProps = dispatch => ({
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
      contracts.CollateralToken,
      contracts.ERC20
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
  selectContract: contract => dispatch(selectContract({ contract }))
});

const SimExchange = withGAPageView(
  connect(mapStateToProps, mapDispatchToProps)(SimExchangeComponent)
);

export default SimExchange;
