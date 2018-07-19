import { connect } from 'react-redux';

import Contracts from '../Contracts.js';
import withGAPageView from './GoogleAnalyticsTracker';
import ContractsList from '../components/ContractsList';

import { loadContracts } from '../actions/explorer';
import CreateInitializer, {
  contractConstructor
} from '../util/web3/contractInitializer';
import { processContractsList } from '../util/contracts';
import store from '../store';

const mapStateToProps = state => ({
  ...state.explorer
});

const mapDispatchToProps = dispatch => ({
  onLoad: () => {
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
  }
});

const Explorer = withGAPageView(
  connect(mapStateToProps, mapDispatchToProps)(ContractsList)
);

export default Explorer;
